import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "react-responsive";
import useResponsiveWidth from "./useResponsiveWidth"; // 파일 경로에 맞게 수정하세요.

// react-responsive 모듈 모킹
jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

describe("useResponsiveWidth", () => {
  const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
    typeof useMediaQuery
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("720px 이하일 때 'mobile'을 반환한다", () => {
    //1. Arrange
    mockUseMediaQuery.mockImplementation(({ maxWidth, minWidth }) => {
      if (maxWidth === 720) return true;
      if (minWidth === 721 && maxWidth === 1280) return false;
      return false;
    });

    //2. Act
    const { result } = renderHook(() => useResponsiveWidth());

    //3. Assert
    expect(result.current).toBe("mobile");
  });

  test("721px ~ 1280px 사이일 때 'tablet'을 반환한다", () => {
    //1. Arrange
    mockUseMediaQuery.mockImplementation(({ maxWidth, minWidth }) => {
      if (maxWidth === 720) return false;
      if (minWidth === 721 && maxWidth === 1280) return true;
      return false;
    });

    //2. Act
    const { result } = renderHook(() => useResponsiveWidth());

    //3. Assert
    expect(result.current).toBe("tablet");
  });

  test("1281px 이상일 때 'desktop'을 반환한다", () => {
    //1. Arrange
    mockUseMediaQuery.mockReturnValue(false);

    //2. Act
    const { result } = renderHook(() => useResponsiveWidth());

    //3. Assert
    expect(result.current).toBe("desktop");
  });
});
