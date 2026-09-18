import type { Metadata } from 'next'

import LegalDocument, { type LegalSection } from '@/components/ui/LegalDocument'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
}

// Hardcoded legal copy supplied directly by the Association
// (terms_and_conditions.txt) — not a Sanity-driven section, same treatment
// as the FAQ page.
const sections: LegalSection[] = [
  {
    heading: '1. About the Website',
    blocks: [
      {
        type: 'p',
        text: 'This website is operated by the Ilma International Old Girls\' Association ("IIOGA", "we", "our", or "us") to provide information about the Association, its activities, events, initiatives, and other matters relevant to its members, former students, supporters, and the wider community.',
      },
      {
        type: 'p',
        text: 'The website is primarily informational. Certain activities, including event registrations and donations, may be facilitated through external services such as Google Forms.',
      },
    ],
  },
  {
    heading: '2. Use of the Website',
    blocks: [
      {
        type: 'p',
        text: 'You agree to use this website only for lawful purposes and in a manner that does not:',
      },
      {
        type: 'ul',
        items: [
          'Violate any applicable law or regulation',
          'Infringe the rights of IIOGA or any third party',
          'Attempt to gain unauthorised access to the website or its systems',
          'Interfere with the operation or security of the website',
          'Introduce malicious software, viruses, or other harmful material',
          'Misuse information or services provided through the website',
        ],
      },
      {
        type: 'p',
        text: 'IIOGA reserves the right to restrict or terminate access to the website where necessary to protect the website, its users, or the Association.',
      },
    ],
  },
  {
    heading: '3. Website Content',
    blocks: [
      {
        type: 'p',
        text: 'We make reasonable efforts to ensure that information published on the website is accurate and up to date.',
      },
      {
        type: 'p',
        text: 'However, information may occasionally contain errors, omissions, or become outdated. IIOGA does not guarantee that all information on the website will always be complete, accurate, current, or available.',
      },
      {
        type: 'p',
        text: 'Information relating to events, programmes, activities, dates, locations, fees, or other arrangements may be changed or cancelled when circumstances require.',
      },
      {
        type: 'p',
        text: 'IIOGA reserves the right to modify, update, or remove website content at any time without prior notice.',
      },
    ],
  },
  {
    heading: '4. Event Registration',
    blocks: [
      {
        type: 'p',
        text: 'Where event registration is provided through an online form, submitting a registration form does not necessarily guarantee participation unless confirmation is provided by IIOGA.',
      },
      {
        type: 'p',
        text: 'Depending on the event, participation may be subject to:',
      },
      {
        type: 'ul',
        items: [
          'Availability of places',
          'Registration deadlines',
          'Eligibility requirements',
          'Payment of applicable fees',
          'Confirmation by the Association',
          'Changes to the event schedule or arrangements',
        ],
      },
      {
        type: 'p',
        text: 'IIOGA reserves the right to amend, postpone, or cancel an event where circumstances require.',
      },
      {
        type: 'p',
        text: 'If an event is cancelled or materially changed, IIOGA will make reasonable efforts to communicate the relevant information to registered participants.',
      },
    ],
  },
  {
    heading: '5. Donations',
    blocks: [
      {
        type: 'p',
        text: 'IIOGA welcomes voluntary donations to support its activities and initiatives.',
      },
      {
        type: 'p',
        text: 'Donation information may be submitted through a Google Form or another designated method communicated by the Association.',
      },
      {
        type: 'p',
        text: 'A donation does not automatically confer membership, voting rights, sponsorship status, or any other entitlement unless expressly stated by IIOGA.',
      },
      {
        type: 'p',
        text: 'Donations should only be made using the official payment or donation instructions provided by IIOGA.',
      },
      {
        type: 'p',
        text: 'IIOGA will not ask donors to provide passwords, PINs, or other confidential banking credentials through ordinary online forms.',
      },
      {
        type: 'p',
        text: 'Where donations are made through a third-party payment service or financial institution, the terms and conditions of that service may also apply.',
      },
    ],
  },
  {
    heading: '6. Payments and Refunds',
    blocks: [
      {
        type: 'p',
        text: 'Where an event or activity requires payment, the applicable fee and payment instructions will be communicated at the time of registration.',
      },
      {
        type: 'p',
        text: 'Any refund, cancellation, or transfer arrangements will depend on the specific event or activity and will be communicated to participants where applicable.',
      },
      {
        type: 'p',
        text: 'IIOGA reserves the right to establish different refund or cancellation terms for individual events.',
      },
    ],
  },
  {
    heading: '7. Third-Party Services and Links',
    blocks: [
      {
        type: 'p',
        text: 'The website may contain links to websites, social media pages, online forms, payment services, or other resources operated by third parties.',
      },
      {
        type: 'p',
        text: 'These services are not necessarily owned or controlled by IIOGA.',
      },
      {
        type: 'p',
        text: 'IIOGA is not responsible for the availability, content, security, privacy practices, or terms of third-party websites or services.',
      },
      {
        type: 'p',
        text: "Your use of a third-party service is subject to that service's own terms and policies.",
      },
    ],
  },
  {
    heading: '8. Google Forms',
    blocks: [
      {
        type: 'p',
        text: 'IIOGA may use Google Forms to collect information for event registrations, donations, surveys, and other Association activities.',
      },
      {
        type: 'p',
        text: "When you submit information through a Google Form, you are also using a service provided by Google and may therefore be subject to Google's applicable terms and policies.",
      },
      {
        type: 'p',
        text: 'Please refer to our Privacy Policy for information about how IIOGA handles personal information collected through such forms.',
      },
    ],
  },
  {
    heading: '9. Intellectual Property',
    blocks: [
      {
        type: 'p',
        text: 'Unless otherwise stated, the content published on this website, including text, logos, graphics, photographs, documents, designs, and other materials, is owned by or used with permission by IIOGA.',
      },
      {
        type: 'p',
        text: 'You may view and use website content for personal, non-commercial, and informational purposes.',
      },
      {
        type: 'p',
        text: 'You may not reproduce, modify, distribute, publish, sell, or commercially exploit website content without prior written permission from IIOGA or the relevant copyright holder.',
      },
      {
        type: 'p',
        text: 'If you believe that material appearing on the website infringes your intellectual property rights, please contact IIOGA so that the matter can be reviewed.',
      },
    ],
  },
  {
    heading: '10. Photographs and Event Media',
    blocks: [
      {
        type: 'p',
        text: 'Photographs, videos, or other media may be taken during IIOGA events and activities for purposes such as documenting events, promoting Association activities, and maintaining an archive of Association events.',
      },
      {
        type: 'p',
        text: 'Where appropriate, participants will be informed of photography or recording arrangements.',
      },
      {
        type: 'p',
        text: 'If you have a concern about a particular photograph or video appearing on an IIOGA platform, please contact us and provide sufficient information for us to identify the material.',
      },
    ],
  },
  {
    heading: '11. User-Submitted Information',
    blocks: [
      {
        type: 'p',
        text: 'Where you submit information, comments, photographs, or other material to IIOGA through the website or an associated form, you are responsible for ensuring that the information you provide is accurate and that you have the necessary rights or permissions to provide any material belonging to another person.',
      },
      {
        type: 'p',
        text: 'You must not submit content that is unlawful, defamatory, abusive, misleading, fraudulent, or infringes the rights of another person.',
      },
      {
        type: 'p',
        text: 'IIOGA reserves the right to disregard, remove, or decline to publish material that does not comply with these requirements.',
      },
    ],
  },
  {
    heading: '12. Disclaimer',
    blocks: [
      {
        type: 'p',
        text: 'The website and its content are provided for general informational purposes.',
      },
      {
        type: 'p',
        text: 'To the extent permitted by applicable law, IIOGA makes no guarantee that:',
      },
      {
        type: 'ul',
        items: [
          'The website will always be available or uninterrupted',
          'The website will be free from errors or technical issues',
          'Information provided on the website will always be complete or current',
          'External websites or services linked from the website will remain available or accurate',
        ],
      },
      {
        type: 'p',
        text: 'Nothing on this website should be interpreted as professional legal, financial, medical, or other professional advice unless specifically identified as such.',
      },
    ],
  },
  {
    heading: '13. Limitation of Liability',
    blocks: [
      {
        type: 'p',
        text: 'To the extent permitted by applicable law, IIOGA shall not be responsible for losses, damages, or expenses arising from the use of, or inability to use, this website or third-party services accessed through the website.',
      },
      {
        type: 'p',
        text: 'This does not exclude or limit any liability that cannot lawfully be excluded or limited under applicable law.',
      },
    ],
  },
  {
    heading: '14. Indemnity',
    blocks: [
      {
        type: 'p',
        text: 'To the extent permitted by applicable law, you agree to be responsible for any claims, losses, liabilities, costs, or expenses arising from your unlawful use of the website or your violation of these Terms and Conditions.',
      },
    ],
  },
  {
    heading: '15. Changes to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'IIOGA may update these Terms and Conditions from time to time.',
      },
      {
        type: 'p',
        text: 'Changes will be published on this page, together with an updated Effective Date. Your continued use of the website after changes are published constitutes your acceptance of the updated terms, to the extent permitted by applicable law.',
      },
    ],
  },
  {
    heading: '16. Governing Law',
    blocks: [
      {
        type: 'p',
        text: 'These Terms and Conditions shall be governed by and interpreted in accordance with the laws of Sri Lanka, unless applicable law requires otherwise.',
      },
      {
        type: 'p',
        text: 'Any disputes relating to these Terms and Conditions shall be subject to the applicable courts and legal processes of Sri Lanka.',
      },
    ],
  },
  {
    heading: '17. Contact Us',
    blocks: [
      {
        type: 'p',
        text: 'If you have questions regarding these Terms and Conditions, please contact:',
      },
      { type: 'contact' },
    ],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      title="Terms and Conditions"
      lastUpdated="18 September 2026"
      sections={sections}
    />
  )
}
