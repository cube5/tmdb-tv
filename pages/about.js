import Link from "next/link";

export default () => {
  return (
    <div>
      Hello World.{" "}
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/dude">
        <a>Day</a>
      </Link>
    </div>
  );
};
