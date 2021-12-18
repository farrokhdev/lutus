import Link from "next/link";

export default function Custom404() {
  return <div className={"page-404"}>
    <div className="h-75 d-flex justify-content-center flex-column">
      <img className={"mx-auto"} src={"/static/images/404.png"} width={600} />
      <h3 className={"amount-title text-center"}>صفحه مورد نظر یافت نشد</h3>
      <Link href={"/"}><a className={"text-center py-2"}>برگشت به خانه</a></Link>
    </div>
  </div>
}
