import "./../styles/button.css";
const Button = (props: any) => {
  return (
    <>
      <button
        className={`button `}
        style={{ background: `${props.color}`, width: `${props.style}` }}
        onClick={(e) => props.click && props.click(props.function)}
      >
        {props.name}
      </button>
    </>
  );
};
export default Button;
