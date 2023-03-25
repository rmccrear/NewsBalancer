
const style={
    logo: {
        margin: "1em auto",
        color: "#000034"
    },
    h1: {
        margin: "0",
    },
    img: {
        height: "1.5em",
        margin: "0 0.5em 0 0"
    }
}

function Logo() {
  return (
    <div className="logo" style={style.logo}>
      <h1 style={style.h1}>
        <img src="/logo.png" alt="Logo" style={style.img}/>
        Timio
      </h1>
    </div>
  );
}

export default Logo;
