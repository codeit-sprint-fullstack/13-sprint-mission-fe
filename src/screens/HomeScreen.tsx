import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, ensureAnonymousAuth, auth } from "../../firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const MIN_ACCURACY = 100;
const WRITE_INTERVAL_MS = 30000;
const MAX_RETRY = 3;

type PendingLocation = {
  patientId: string;
  lat: number;
  lng: number;
  accuracy: number;
  failedAt: number;
  retry: number;
};

export default function HomeScreen() {
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  const lastWriteRef = useRef(0);
  const inFlightRef = useRef(false);

  const [status, setStatus] = useState("대기");
  const [tracking, setTracking] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  useEffect(() => {
    init();

    return () => {
      stopGPS();
    };
  }, []);

  async function init() {
    try {
      await ensureAnonymousAuth();
      const saved = await AsyncStorage.getItem("last_location_at");
      if (saved) setLastSaved(Number(saved));
      setStatus("준비 완료");
    } catch {
      setStatus("초기화 실패");
    }
  }

  async function getPatientId() {
    await ensureAnonymousAuth();

    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("익명 로그인 실패: uid 없음");

    const stored = await AsyncStorage.getItem("jjamkan_patient_id");
    if (stored !== uid) {
      await AsyncStorage.setItem("jjamkan_patient_id", uid);
    }

    return uid;
  }

  function valid(lat: number, lng: number) {
    return Number.isFinite(lat) && Number.isFinite(lng);
  }

  async function getPending(): Promise<PendingLocation | null> {
    try {
      const raw = await AsyncStorage.getItem("pending_location");
      return raw ? JSON.parse(raw) : null;
    } catch {
      await AsyncStorage.removeItem("pending_location");
      return null;
    }
  }

  async function setPending(data: PendingLocation) {
    await AsyncStorage.setItem("pending_location", JSON.stringify(data));
  }

  async function clearPending() {
    await AsyncStorage.removeItem("pending_location");
  }

  async function write(id: string, lat: number, lng: number, accuracy: number, now: number) {
    await setDoc(
      doc(db, "patients", id),
      {
        patientId: id,
        lat,
        lng,
        accuracy,
        deviceAt: now,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async function resendPending(id: string, now: number) {
    const pending = await getPending();
    if (!pending) return;

    if ((pending.retry ?? 0) >= MAX_RETRY) {
      await clearPending();
      setStatus("pending 폐기");
      return;
    }

    if (!pending.failedAt || pending.failedAt >= now) return;

    try {
      await write(id, pending.lat, pending.lng, pending.accuracy, now);
      await clearPending();
      setStatus("pending 복구 성공");
    } catch {
      pending.retry = (pending.retry ?? 0) + 1;
      pending.failedAt = now;
      await setPending(pending);
    }
  }

  async function startGPS() {
    if (watchRef.current) return;

    try {
      await ensureAnonymousAuth();

      const perm = await Location.requestForegroundPermissionsAsync();
      if (perm.status !== "granted") {
        setStatus("권한 거부");
        return;
      }

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        async (pos) => {
          if (inFlightRef.current) return;

          const now = Date.now();
          const { latitude, longitude, accuracy } = pos.coords;

          if (!valid(latitude, longitude)) return;
          if (typeof accuracy !== "number" || accuracy > MIN_ACCURACY) return;
          if (now - lastWriteRef.current < WRITE_INTERVAL_MS) return;

          inFlightRef.current = true;

          try {
            const id = await getPatientId();

            await resendPending(id, now);
            await write(id, latitude, longitude, Math.round(accuracy), now);

            lastWriteRef.current = now;
            setLastSaved(now);

            await AsyncStorage.setItem("last_location_at", String(now));
            await clearPending();

            setStatus("Firestore 저장 성공");
          } catch {
            const id = await getPatientId();
            const existing = await getPending();

            await setPending({
              patientId: id,
              lat: latitude,
              lng: longitude,
              accuracy: Math.round(accuracy),
              failedAt: now,
              retry: existing?.retry ?? 0,
            });

            setStatus("저장 실패 → pending");
          } finally {
            inFlightRef.current = false;
          }
        }
      );

      setTracking(true);
      setStatus("추적 시작");
    } catch {
      setStatus("GPS 시작 실패");
    }
  }

  function stopGPS() {
    if (watchRef.current) {
      watchRef.current.remove();
      watchRef.current = null;
    }

    setTracking(false);
    setStatus("중지됨");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>잠깐 · 환자앱</Text>
      <Text style={styles.status}>상태: {status}</Text>
      <Text style={styles.status}>
        마지막 저장: {lastSaved ? new Date(lastSaved).toLocaleTimeString() : "-"}
      </Text>

      <Pressable
        style={[styles.btn, tracking ? styles.stop : styles.start]}
        onPress={() => {
          if (tracking) stopGPS();
          else startGPS();
        }}
      >
        <Text style={styles.btnText}>{tracking ? "중지" : "추적 시작"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  status: {
    marginTop: 10,
    fontSize: 16,
  },
  btn: {
    marginTop: 24,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 160,
    alignItems: "center",
  },
  start: {
    backgroundColor: "#2563EB",
  },
  stop: {
    backgroundColor: "#DC2626",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
