'use client'
import { useRouter } from 'next/navigation'
 
export default function NotFound() {
  const router = useRouter()
  return (
    <div className='container mx-auto'>
      <h2 className='my-3'>お探しのページは見つかりませんでした</h2>
      <p>お手数をおかけしますが、下の戻るボタンを押して前のページへ戻ってください。</p>
      <button className='inputStyle my-5' type="button" onClick={() => router.back()}>
      前のページへ戻る
    </button>
    </div>
  )
}