import { parse, type ComponentDoc } from 'vue-docgen-api'
import { promises as fs } from 'fs'
import path from 'path'

interface ProjectConfig {
  path: string
  name: string
}

const projects: ProjectConfig[] = [{ name: 'Core', path: '../core/src/components' }]

interface ProjectComponents {
  name: string
  components: ComponentDoc[]
}

export default async function parseComponents() {
  const projectComponents: ProjectComponents[] = []

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    const dir = await fs.readdir(project.path)
    const vueFiles = dir.filter((f: string) => f.endsWith('.vue'))

    const components: ComponentDoc[] = []
    for (let j = 0; j < vueFiles.length; j++) {
      const vueFile = path.join(project.path, vueFiles[j])
      const component = await parse(vueFile)
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
