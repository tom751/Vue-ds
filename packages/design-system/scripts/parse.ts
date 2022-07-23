import { parse, type ComponentDoc } from 'vue-docgen-api'
import { promises as fs } from 'fs'
import fg from 'fast-glob'

interface ProjectConfig {
  path: string
  name: string
}

const projects: ProjectConfig[] = [{ name: 'Core', path: '../core/src/components/**/*.vue' }]

interface ProjectComponents {
  name: string
  components: ComponentDoc[]
}

export default async function parseComponents() {
  const projectComponents: ProjectComponents[] = []

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    const vueFiles = await fg(project.path)
    console.log(vueFiles)

    const components: ComponentDoc[] = []
    for (let j = 0; j < vueFiles.length; j++) {
      const component = await parse(vueFiles[j])
      components.push(component)
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
