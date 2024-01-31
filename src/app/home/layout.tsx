export default function Layout(props: {
    children: React.ReactNode
    list: React.ReactNode
    note: React.ReactNode
  }) {
    return (
      <div className="flex xl:flex-row flex-col relative">
        <div className="max-w-max xl:w-[300px] xl:relative absolute">{props.children}</div>
        <div className="flex-grow flex flex-col xl:grid xl:grid-cols-8">
          <div className="xl:col-span-2 xl:block hidden">{props.list}</div>
          <div className="xl:col-span-6">{props.note}</div>
        </div>
      </div>
    )
  }