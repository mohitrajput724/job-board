const ejs = require('ejs')
const fs = require('fs-extra')

const jobs = [
  { id: 1, title: 'Frontend Developer', company: 'Acme Co', location: 'Remote' },
  { id: 2, title: 'Node.js Backend Dev', company: 'Tech Ltd', location: 'Delhi' },
]

async function build() {
  await fs.emptyDir('dist')           // wipe old build
  await fs.copy('public', 'dist/public') // copy CSS/images

  // render home page
  const index = await ejs.renderFile('views/index.ejs', { jobs })
  await fs.outputFile('dist/index.html', index)

  // render one page per job
  //for (const job of jobs) {
  //  const page = await ejs.renderFile('views/job.ejs', { job })
  //  await fs.outputFile(`dist/jobs/${job.id}/index.html`, page)
  //}
  console.log('Build done — check your /dist folder')
}
build()