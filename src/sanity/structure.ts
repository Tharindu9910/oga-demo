import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import type { StructureResolver } from 'sanity/structure'

import { singletonTypes } from './schemaTypes'

const SINGLETON_LIST_ITEMS: { id: string; title: string }[] = [
  { id: 'homePage', title: 'Home page' },
  { id: 'aboutPage', title: 'About page' },
  { id: 'projectsPage', title: 'Projects page' },
  { id: 'membershipPage', title: 'Become a Member page' },
  { id: 'loyaltyPage', title: 'Loyalty program page' },
]

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) => {
  const groupedTypes = new Set([
    ...singletonTypes,
    'project',
    'event',
    'chapter',
    'post',
  ])

  return S.list()
    .title('Content')
    .items([
      ...SINGLETON_LIST_ITEMS.map(({ id, title }) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.listItem()
        .id('project')
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              orderableDocumentListDeskItem({
                type: 'project',
                id: 'project-ongoing',
                title: 'Ongoing',
                filter: 'status == "ongoing"',
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: 'project',
                id: 'project-completed',
                title: 'Completed',
                filter: 'status == "completed"',
                S,
                context,
              }),
            ]),
        ),
      S.listItem()
        .id('event')
        .title('Events')
        .child(
          S.list()
            .title('Events')
            .items([
              orderableDocumentListDeskItem({
                type: 'event',
                id: 'event-upcoming',
                title: 'Upcoming',
                filter: 'status == "upcoming"',
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: 'event',
                id: 'event-past',
                title: 'Past',
                filter: 'status == "past"',
                S,
                context,
              }),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: 'chapter',
        title: 'Overseas chapters',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'post',
        title: 'Blog posts',
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (item) => !groupedTypes.has(item.getId() ?? ''),
      ),
    ])
}
