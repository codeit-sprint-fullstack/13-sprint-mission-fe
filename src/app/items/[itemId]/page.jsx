"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import ConfirmModal from "@/app/components/ui/Modal";
import {
  getProduct,
  deleteProduct,
  favoriteProduct,
  unfavoriteProduct,
  getProductComments,
  createProductComment,
  updateComment,
  deleteComment,
} from "@/app/lib/api";
