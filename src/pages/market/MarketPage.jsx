import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Button,
  Dropdown,
  ProductCardList,
  Input,
  Pagination,
} from "@/components";
import { useResponsiveWidth } from "@/hooks";
import { signIn, getProduct } from "@/apis";
import constant from "../../components/Dropdown/constant";
import styles from "./MarketPage.module.css";

export default function MarketPage() {
  /*1. Hooks */
  const size = useResponsiveWidth();

  /*2. State */
  const [token, setToken] = useState(null);
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState(constant[0]);
  const [page, setPage] = useState(1);

  /*3. Server State (React-Query) */
  //Product 받기
  const { data: products = { list: [] }, isPending: isProductsPending } =
    useQuery({
      queryKey: ["products", token, page, selected, keyword, size],
      queryFn: () =>
        getProduct({
          page,
          pageSize: size === "mobile" ? 4 : size === "tablet" ? 6 : 10,
          orderBy: selected.type,
          keyword,
        }),
      placeholderData: keepPreviousData,
    });

  //Best 받기
  const { data: bestRaw = [], isPending: isBestPending } = useQuery({
    queryKey: ["best", token],
    queryFn: async () => {
      const res = await getProduct({
        page,
        orderBy: "favorite",
      });
      return res?.list;
    },
  });

  /*4. Derived Data */
  const best =
    size === "mobile"
      ? bestRaw.slice(0, 1)
      : size === "tablet"
        ? bestRaw.slice(0, 2)
        : bestRaw.slice(0, 4);

  /*5. Effects */
  //로그인 페이지 생성 전까지 사용할 임시 로그인 로직
  useEffect(() => {
    const signInPost = async () => {
      const user = await signIn("example@email.com", "password");
      localStorage.setItem("accessToken", user.accessToken);
      setToken(user.accessToken);
    };
    signInPost();
  }, []);

  /*6. Render */
  return (
    <div className={styles.content}>
      <ProductCardList
        title="베스트 상품"
        column={{
          desktop: 4,
          tablet: 2,
          mobile: 1,
        }}
        data={best}
        isPending={isBestPending}
      />
      <ProductCardList
        title="판매 중인 상품"
        column={{
          desktop: 5,
          tablet: 3,
          mobile: 2,
        }}
        data={products?.list}
        isPending={isProductsPending}
      >
        {size !== "mobile" ? (
          <>
            <Input
              placeholder="검색할 상품을 입력해주세요"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length === 0) {
                  setPage(1);
                  setKeyword(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setPage(1);
                  setKeyword(input);
                }
              }}
              className={styles.input}
            />
            <Dropdown
              menu={constant}
              value={selected}
              onChange={(s) => {
                if (s !== selected) {
                  setSelected(s);
                  setPage(1);
                }
              }}
            />
            <Link to="/registeration">
              <Button variant="rectangle">상품 등록하기</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/registeration">
              <Button variant="rectangle">상품 등록하기</Button>
            </Link>

            <Input
              placeholder="검색할 상품을 입력해주세요"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length === 0) {
                  setPage(1);
                  setKeyword(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setPage(1);
                  setKeyword(input);
                }
              }}
              className={styles.input}
            />
            <Dropdown
              menu={constant}
              value={selected}
              onChange={(s) => {
                if (s !== selected) {
                  setSelected(s);
                  setPage(1);
                }
              }}
            />
          </>
        )}
      </ProductCardList>
      <Pagination
        currentPage={page}
        totalCount={products?.totalCount}
        onChange={setPage}
      />
    </div>
  );
}
