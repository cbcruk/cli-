import puppeteer from 'puppeteer-core'
import AdmZip from 'adm-zip'

async function getBrowserPage(url) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
  })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForNetworkIdle()

  return { browser, page }
}

async function main() {
  const zip = new AdmZip()
  const ref = {
    current: 0,
  }
  const [url] = process.argv.slice(2)
  const { browser, page } = await getBrowserPage(url)
  const { galleryid, urls } = await page.evaluate(() => {
    const w = window as any
    const galleryid = w.galleryid
    const urls = w.galleryinfo.files.map((image, index) => {
      if (index === 0) {
        return {
          pathname: w.url_from_url_from_hash(w.galleryid, image),
          name: image.name,
        }
      }

      return {
        pathname: w.url_from_url_from_hash(
          w.galleryid,
          image,
          'webp',
          undefined,
          'a'
        ),
        name: image.name.replace(/[^.]*$/, 'webp'),
      }
    })

    w.download_gallery(w.galleryinfo.japanese_title || w.galleryinfo.title)

    return { urls, galleryid }
  })

  page.on('response', async (response) => {
    const url = response.url()

    if (url.endsWith('webp')) {
      zip.addFile(urls[ref.current].name, await response.buffer())
      ref.current++
    }

    if (ref.current === urls.length - 1) {
      zip.writeZip(`${galleryid}.zip`)
      await browser.close()
    }
  })
}

export default main
