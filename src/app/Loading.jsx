

const Loading = () => {
  return (
    <div className="align-middle" >
      <div className="animate-pulse flex flex-col items-center sm:items-start gap-4 mx-4">
        <div className="relative flex w-[99%] animate-pulse gap-2 p-4">
          <div className="h-12 w-12 rounded-full bg-slate-400"></div>
          <div className="flex-1">
            <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
            <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
          </div>
          {/* <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div> */}
        </div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-[20rem] bg-slate-400 w-full sm:w-[20rem] rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
      </div>
    </div>
  )
}

export default Loading;