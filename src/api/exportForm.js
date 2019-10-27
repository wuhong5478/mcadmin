import axios from 'axios'
export function exportMethod(data) {
  axios({
    method: data.method,
    url: data.url,
    responseType: 'blob'
  })
    .then(res => {
      const link = document.createElement('a')
      let blob = new Blob([res.data], { type: 'application/ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      // link.download = res.headers['content-disposition'] //下载后文件名
      link.download = data.fileName //下载的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch(error => {
      console.log(error)
    })
}
