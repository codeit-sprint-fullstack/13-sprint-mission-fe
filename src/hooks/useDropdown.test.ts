import { renderHook, act } from "@testing-library/react";
import useDropdown from "./useDropdown";

describe("드롭다운 상태를 관리하는 useDropdown", () => {
  test("초기 상태는 닫혀 있다", () => {
    //1. Arrange
    const { result } = renderHook(() => useDropdown());

    //2. Act

    //3. Assert
    expect(result.current.open).toBe(false);
  });

  test("openDropdown을 호출하면 드롭다운이 열린 상태가 된다", () => {
    //1. Arrange
    const { result } = renderHook(() => useDropdown());

    //2. Act
    act(() => {
      result.current.openDropdown();
    });

    //3. Assert
    expect(result.current.open).toBe(true);
  });

  test("closeDropdown을 호출하면 드롭다운이 닫힌 상태가 된다", () => {
    //1. Arrange
    const { result } = renderHook(() => useDropdown());

    //2. Act
    act(() => {
      result.current.openDropdown();
      result.current.closeDropdown();
    });

    //3. Assert
    expect(result.current.open).toBe(false);
  });

  test("toggleDropdown을 호출하면 드롭다운 상태가 반전된다", () => {
    //1. Arrange
    const { result } = renderHook(() => useDropdown());

    //2. Act
    act(() => {
      result.current.toggleDropdown();
    });

    //3. Assert
    expect(result.current.open).toBe(true);

    //4. Act
    act(() => {
      result.current.toggleDropdown();
    });

    //5. Assert
    expect(result.current.open).toBe(false);
  });
});
