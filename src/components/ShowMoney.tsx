'use client'

export default function ShowMoney({distribution}:{distribution:number}){
    return(
        <div className="flex mb-5 show-money">
        <div>
          <h3 className="underline underline-offset-4">もらえる金額</h3>
        </div>
        <div className="ml-5">
          <div  className="text-2xl">
            自分：{distribution}円
          </div>
          <div className="text-2xl">
            相手：{1000-distribution}円
          </div>
        </div>
      </div>
    )
}