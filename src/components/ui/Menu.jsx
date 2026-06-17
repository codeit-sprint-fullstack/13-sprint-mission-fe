export default function Menu({ menus, className, ...props }) {
  return (
    <div
      {...props}
      className={`${className} w-[130px] absolute mt-[8px] border border-secondary-200 rounded-[12px] overflow-hidden divide-y divide-secondary-200 z-5 max-tablet:right-0`}
    >
      {menus.map((menu, index) => (
        <div
          key={index}
          className="w-full py-[8px] flex justify-center bg-white whitespace-nowrap cursor-pointer hover:bg-secondary-50"
        >
          <p className="m-auto">{menu.name}</p>
        </div>
      ))}
    </div>
  );
}
