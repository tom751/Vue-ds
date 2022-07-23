import { parse, type ComponentDoc } from 'vue-docgen-api'
import { promises as fs } from 'fs'
import fg from 'fast-glob'

interface ProjectConfig {
  path: string
  name: string
}

const projects: ProjectConfig[] = [{ name: 'Core', path: '../core/src/components/**/*.vue' }]

interface Component {
  docs: ComponentDoc
  folder: string
}

interface ProjectComponents {
  name: string
  components: Component[]
}

function getComponentFolderName(filePath: string) {
  // The section of the path to cut the folder name from AFTER
  const prefix = 'components/'

  const index = filePath.indexOf(prefix)
  if (index === -1) {
    return ''
  }

  const substring = filePath.slice(index + prefix.length)

  // trim off the component name
  const split = substring.split('/')
  if (split.length > 1) {
    return split.slice(0, split.length - 1).join('/')
  }

  return ''
}

export default async function parseComponents() {
  const projectComponents: ProjectComponents[] = []

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    const vueFiles = await fg(project.path)

    const components: Component[] = []
    for (let j = 0; j < vueFiles.length; j++) {
      const filePath = vueFiles[j]
      const component = await parse(filePath)
      components.push({
        docs: component,
        folder: getComponentFolderName(filePath),
      })
    }

    projectComponents.push({
      components,
      name: project.name,
    })
  }

  await writeFile(projectComponents)
}

async function writeFile(projectComponents: ProjectComponents[]) {
  try {
    await fs.writeFile('./components.json', JSON.stringify(projectComponents, null, 2))
    console.log('file written')
  } catch (error) {
    console.error('error writing component file', error)
  }
}

parseComponents()
