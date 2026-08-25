import { getDate, getTime } from "./getDate";

describe("날짜 및 시간 정보 변환", () => {
  describe("getDate", () => {
    test("한 자리 월을 앞에 0을 붙인 두 자리 형식으로 반환한다", () => {
      //1. Arrange
      const stringDate = new Date(2026, 7, 20, 10, 44, 30).toString(); //8월 20일
      //2. Act
      const transformedDate = getDate(stringDate);
      //3. Assert
      expect(transformedDate).toBe("2026. 08. 20");
    });
    test("한 자리 일을 앞에 0을 붙인 두 자리 형식으로 반환한다", () => {
      //1. Setup
      const date = new Date(2026, 10, 2, 10, 44, 30); //11월 2일
      const stringDate = date.toString();
      //2. Excercise
      const transformedDate = getDate(stringDate);
      //3. Assertion
      expect(transformedDate).toBe("2026. 11. 02");
    });
    test("한 자리 월과 일을 모두 두 자리 형식으로 반환한다", () => {
      //1. Setup
      const date = new Date(2026, 7, 2, 10, 44, 30); //8월 2일
      const stringDate = date.toString();
      //2. Excercise
      const transformedDate = getDate(stringDate);
      //3. Assertion
      expect(transformedDate).toBe("2026. 08. 02");
    });
  });

  describe("getTime", () => {
    beforeAll(() => {
      jest.useFakeTimers();

      const currentTime = new Date();
      jest.setSystemTime(currentTime);
    });

    test("1분 미만의 경과 시간을 1분으로 반환한다", () => {
      //1. Arrange
      const createdTime1 = new Date();
      createdTime1.setSeconds(createdTime1.getSeconds() - 0);
      const createdTime2 = new Date();
      createdTime2.setSeconds(createdTime2.getSeconds() - 1);
      const createdTime3 = new Date();
      createdTime3.setSeconds(createdTime3.getSeconds() - 30);
      const createdTime4 = new Date();
      createdTime4.setSeconds(createdTime4.getSeconds() - 59);
      const createdTime5 = new Date();
      createdTime5.setSeconds(createdTime5.getSeconds() - 60);
      //2. Act
      const result1 = getTime(createdTime1.toString());
      const result2 = getTime(createdTime2.toString());
      const result3 = getTime(createdTime3.toString());
      const result4 = getTime(createdTime4.toString());
      const result5 = getTime(createdTime5.toString());
      //3. Assert
      expect(result1).toBe("1분");
      expect(result2).toBe("1분");
      expect(result3).toBe("1분");
      expect(result4).toBe("1분");
      expect(result5).toBe("1분");
    });

    test("1분 이상 60분 미만의 경과 시간을 분 단위로 반환한다", () => {
      const createdTime1 = new Date();
      createdTime1.setMinutes(createdTime1.getMinutes() - 1);
      const createdTime2 = new Date();
      createdTime2.setMinutes(createdTime2.getMinutes() - 30);
      const createdTime3 = new Date();
      createdTime3.setMinutes(createdTime3.getMinutes() - 59);

      //2. Act
      const result1 = getTime(createdTime1.toString());
      const result2 = getTime(createdTime2.toString());
      const result3 = getTime(createdTime3.toString());

      //3. Assert
      expect(result1).toBe("1분");
      expect(result2).toBe("30분");
      expect(result3).toBe("59분");
    });

    test("60분 이상 24시간 미만의 경과 시간을 시간 단위로 반환한다", () => {
      //1. Arrange
      const createdTime1 = new Date();
      createdTime1.setMinutes(createdTime1.getMinutes() - 60);
      const createdTime2 = new Date();
      createdTime2.setHours(createdTime2.getHours() - 12);
      const createdTime3 = new Date();
      createdTime3.setHours(createdTime3.getHours() - 23);

      //2. Act
      const result1 = getTime(createdTime1.toString());
      const result2 = getTime(createdTime2.toString());
      const result3 = getTime(createdTime3.toString());

      //3. Assert
      expect(result1).toBe("1시간");
      expect(result2).toBe("12시간");
      expect(result3).toBe("23시간");
    });

    test("24시간 이상의 경과 시간을 시간 단위로 반환한다", () => {
      //1. Arrange
      const createdTime1 = new Date();
      createdTime1.setHours(createdTime1.getHours() - 24);
      const createdTime2 = new Date();
      createdTime2.setHours(createdTime2.getHours() - 36);
      const createdTime3 = new Date();
      createdTime3.setHours(createdTime3.getHours() - 48);

      //2. Act
      const result1 = getTime(createdTime1.toString());
      const result2 = getTime(createdTime2.toString());
      const result3 = getTime(createdTime3.toString());

      //3. Assert
      expect(result1).toBe("1일");
      expect(result2).toBe("2일");
      expect(result3).toBe("2일");
    });
  });
});
