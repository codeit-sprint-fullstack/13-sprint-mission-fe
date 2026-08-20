import { getTotalPage, getRange } from "./pagination";

describe("페이지네이션에 필요한 로직", () => {
  describe("getTotalPage", () => {
    test("전체 게시물 수가 페이지 크기로 나누어떨어지면 정확한 페이지 수를 반환한다", () => {
      //1. Arrange
      const pageSize = 5;
      const totalCount = 15;
      //2. Act
      const totalPage = getTotalPage(pageSize, totalCount);
      //3. Assert
      expect(totalPage).toBe(3);
    });
    test("전체 게시물 수가 페이지 크기로 나누어떨어지지 않으면 페이지 수를 올림하여 반환한다", () => {
      //1. Arrange
      const pageSize = 5;
      const totalCount = 14;
      //2. Act
      const totalPage = getTotalPage(pageSize, totalCount);
      //3. Assert
      expect(totalPage).toBe(3);
    });
  });

  describe("getRange", () => {
    describe("getRange", () => {
      test("현재 페이지가 첫 번째 페이지 범위에 속하면 1부터 5까지 반환한다", () => {
        //1. Arrange
        const currentPage = 1;
        const totalPage = 10;

        //2. Act
        const range = getRange(currentPage, totalPage);

        //3. Assert
        expect(range).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test("현재 페이지가 두 번째 페이지 범위에 속하면 6부터 10까지 반환한다", () => {
        //1. Arrange
        const currentPage = 6;
        const totalPage = 10;

        //2. Act
        const range = getRange(currentPage, totalPage);

        //3. Assert
        expect(range).toStrictEqual([6, 7, 8, 9, 10]);
      });

      test("마지막 페이지 범위가 5개보다 적으면 마지막 페이지까지만 반환한다", () => {
        //1. Arrange
        const currentPage = 6;
        const totalPage = 7;

        //2. Act
        const range = getRange(currentPage, totalPage);

        //3. Assert
        expect(range).toStrictEqual([6, 7]);
      });
    });
  });
});
