// import {stores} from 'stores';
import {Content$Get$Response} from '@app/utils/types/api';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export class ContentApi {
  get = async (): Promise<Content$Get$Response> => {
    const resp = await fetch('https://cdn.contentful.com/spaces/5dpnrdxj3auy/environments/master/entries?access_token=3MkHs8WfcaNwHoQUOKg_miGwg3WjVWWElK6SGs4IJ8s&include=2&content_type=article');
    const json: any = await resp.json();
    const data: any = {}

    const sectionMap = new Map();
    const articleMap = new Map();
    json.includes?.Entry?.forEach((entry:any) => {
        if (entry.sys?.contentType?.sys?.id === 'section') {
          const section = {
            id: entry.sys.id,
            title: entry.fields.title,
            icon: entry.fields.icon,
            description: entry.fields.description,
            articles: [],
          };
          sectionMap.set(entry.sys.id, section);
        }
      });
      
    const assetMap = new Map();
    json.includes.Asset.forEach((entry: any) => {
      const asset = {
        id: entry.sys?.id,
        title: entry.fields?.title,
        description: entry.fields?.description,
        url: entry.fields?.file.url
      }
      assetMap.set(entry.sys?.id, asset);
    });

    function resolveBody(body: any) {
      return {html: documentToHtmlString(body)};
    }
    
    json.items.forEach((item: any) => {
      const article = {
        id: item.sys.id,
        type: item.sys.contentType.id,
        locale: item.sys.locale,

        title: item.fields.title,
        body: resolveBody(item.fields.body),
        image: assetMap.get(item.fields.image.sys.id),
        index: item.fields.index,
      }
      articleMap.set(item.sys.id, article);
      const sectionId = item.fields.section.sys.id;
      const section = sectionMap.get(sectionId);
      if(section) {
        section.articles.push(article);
      }
    })
    
    const result:any = {
      sections: (<any>Object).fromEntries(sectionMap),
      articles: (<any>Object).fromEntries(articleMap)
    };
    return result;
  };
}
