import React, { useCallback, useEffect, useRef, useState } from 'react'
const MAX_PAGE = 10

const getData = (page) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({data:Array.from({length: 10},(_,ind) => `Item ${ind + 1 + (page - 1) * 10}`),hasMore: page < MAX_PAGE})
    },2000)
  })
}

// using intersection observer
const InfiniteScrollV2 = () => {
  const currentPage = useRef(0)
  const [loading,setLoading] = useState(false)
  const [hasMore,setHasMore] = useState(true)
  const [data,setData] = useState([])
  const observerRef = useRef()

  const fetchData = useCallback(async (page) => {
    try {
      if(loading || !hasMore) return

      setLoading(true)
      const res = await getData(page)
      currentPage.current = page
      setData(prev => ([...prev,...res.data]))
      setHasMore(res.hasMore)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  },[loading,hasMore])

  useEffect(() => {
    fetchData(1)
  },[])

  const callbackRef =  useCallback((element) => {
    if(!element) return

    if(observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(([item]) => {
      if(item) {
        if(item.isIntersecting) {
          fetchData(currentPage.current + 1)
        }
      }
    })

    observerRef.current.observe(element)
  },[fetchData])

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%'}}>
      <div style={{height: '100%',maxHeight:'500px',overflow:'auto',width: '500px'}}>
      {data.map((item,index) => <div style={{
        padding: '16px',
        background: 'red'
      }} ref={index === data.length - 1 ? callbackRef : null}>{item}</div>)}
      {hasMore ? <div>Loading…</div> : null}
      </div>
    </div>
  )
}

export default InfiniteScrollV2