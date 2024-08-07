import type { FileSystem } from '@ui-doc/core'

import type { HtmlRenderer } from './HtmlRenderer'

export class TemplateLoader {
  public static async load({
    renderer,
    fileSystem,
    templateBasePath = '@ui-doc/html-renderer/templates',
  }: {
    renderer: HtmlRenderer
    fileSystem: FileSystem
    templateBasePath?: string
  }): Promise<void> {
    const templatePath = await fileSystem.assetLoader().packagePath(templateBasePath)
    const layoutFinder = fileSystem.createFileFinder([`${templatePath}/layouts/*.html`])
    const pageFinder = fileSystem.createFileFinder([`${templatePath}/pages/*.html`])
    const partialFinder = fileSystem.createFileFinder([`${templatePath}/partials/*.html`])

    const name = (file: string): string => fileSystem.fileBasename(file)
    const content = async (file: string): Promise<string> =>
      (await fileSystem.fileRead(file)).trim()

    await Promise.all([
      layoutFinder.search(async file => {
        renderer.addLayout(name(file), { content: await content(file), source: file })
      }),
      pageFinder.search(async file => {
        renderer.addPage(name(file), { content: await content(file), source: file })
      }),
      partialFinder.search(async file => {
        renderer.addPartial(name(file), { content: await content(file), source: file })
      }),
    ])
  }
}
