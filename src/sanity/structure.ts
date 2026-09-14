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
export const structure: StructureResolver = (S) => {
  const groupedTypes = new Set([...singletonTypes, 'project', 'event'])

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
              S.listItem()
                .id('project-ongoing')
                .title('Ongoing')
                .child(
                  S.documentList()
                    .title('Ongoing projects')
                    .filter('_type == "project" && status == "ongoing"'),
                ),
              S.listItem()
                .id('project-completed')
                .title('Completed')
                .child(
                  S.documentList()
                    .title('Completed projects')
                    .filter('_type == "project" && status == "completed"'),
                ),
            ]),
        ),
      S.listItem()
        .id('event')
        .title('Events')
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .id('event-upcoming')
                .title('Upcoming')
                .child(
                  S.documentList()
                    .title('Upcoming events')
                    .filter(
                      '_type == "event" && dateTime(date) >= dateTime(now())',
                    ),
                ),
              S.listItem()
                .id('event-past')
                .title('Past')
                .child(
                  S.documentList()
                    .title('Past events')
                    .filter(
                      '_type == "event" && dateTime(date) < dateTime(now())',
                    ),
                ),
            ]),
        ),
      ...S.documentTypeListItems().filter(
        (item) => !groupedTypes.has(item.getId() ?? ''),
      ),
    ])
}
