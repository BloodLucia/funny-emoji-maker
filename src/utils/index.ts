export const pathToImage = (path: string) => {
  return new Promise<HTMLImageElement | null>((resolve) => {
    if (path === '') {
      resolve(null)
    }
    const img = new Image(400, 400)
    img.src = path
    img.onload = (e) => {
      resolve(img)
    }
  })
}


export const resolveImportGlobModule = async (
  modules: Record<string, ImportModuleFunction>,
) => {
  const imports = Object.values(modules).map((importFn) => importFn())
  const loadedModules = await Promise.all(imports)

  return loadedModules.map((module) => module.default)
}