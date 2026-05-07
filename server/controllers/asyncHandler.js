export const asyncHandler = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        // 스키마 유효성 검사 실패 (필수 필드 누락, enum 불일치 등)
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        // 올바르지 않은 ID 형식으로 조회했을 때
        res.status(404).send({ message: "Cannot find given id." });
      } else {
        // 그 외 예상치 못한 서버 오류
        res.status(500).send({ message: e.message });
      }
    }
  };
};
