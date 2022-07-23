import projectComponents from '../../components.json'

export function getComponentDocs(projectName: string, componentDisplayName: string) {
  const project = projectComponents.find((pc) => pc.name === projectName)
  if (!project) {
    throw new Error(`Project with name "${projectName}" not found`)
  }

  return project.components.find((c) => c.docs.displayName === componentDisplayName)
}
