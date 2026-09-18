import type { Metadata } from 'next'

import LegalDocument, { type LegalSection } from '@/components/ui/LegalDocument'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

// Hardcoded legal copy supplied directly by the Association (privacy_policy.txt)
// — not a Sanity-driven section, same treatment as the FAQ page.
const sections: LegalSection[] = [
  {
    heading: '1. Information We Collect',
    blocks: [
      {
        type: 'p',
        text: 'Our website is primarily a static informational website. We do not ordinarily collect personal information simply by you browsing the website.',
      },
      {
        type: 'p',
        text: 'However, we may collect personal information when you voluntarily provide it to us, including when you:',
      },
      {
        type: 'ul',
        items: [
          'Register or participate in an IIOGA event',
          'Submit a donation or donation-related request',
          'Contact us or communicate with the Association',
          'Complete another form or provide information for an Association activity',
        ],
      },
      {
        type: 'p',
        text: 'Depending on the purpose of the form, the information collected may include:',
      },
      {
        type: 'ul',
        items: [
          'Full name',
          'Email address',
          'Telephone or mobile number',
          'Address or location',
          'School-related information, such as year of leaving or batch, where relevant',
          'Event participation details',
          'Donation-related information',
          'Any other information that you voluntarily provide through a form',
        ],
      },
      {
        type: 'p',
        text: 'We aim to collect only information that is reasonably necessary for the relevant purpose.',
      },
    ],
  },
  {
    heading: '2. Google Forms',
    blocks: [
      {
        type: 'p',
        text: 'We use Google Forms to collect information for purposes such as event registrations, participation confirmations, and donations.',
      },
      {
        type: 'p',
        text: "When you submit information through a Google Form, the information is processed using Google's services and may be stored in Google systems associated with the Association's account.",
      },
      {
        type: 'p',
        text: "Google may process information in accordance with its own privacy policies and terms. We encourage you to review Google's privacy information to understand how Google handles information submitted through its services.",
      },
      {
        type: 'p',
        text: 'The Association will use information submitted through our forms only for legitimate Association-related purposes and in accordance with this Privacy Policy.',
      },
    ],
  },
  {
    heading: '3. How We Use Your Information',
    blocks: [
      { type: 'p', text: 'We may use the information you provide to:' },
      {
        type: 'ul',
        items: [
          'Register you for Association events and activities',
          'Confirm your participation',
          'Communicate with you regarding events, activities, or donations',
          'Maintain appropriate records of event participation and donations',
          'Acknowledge or administer donations where applicable',
          'Organise and manage Association activities',
          'Respond to enquiries',
          'Communicate important information relating to the Association',
          'Comply with applicable legal or administrative requirements',
        ],
      },
      {
        type: 'p',
        text: 'We will not use your personal information for unrelated purposes without a lawful basis or, where appropriate, your consent.',
      },
    ],
  },
  {
    heading: '4. Donations',
    blocks: [
      {
        type: 'p',
        text: 'IIOGA may invite members, former students, supporters, and other individuals to make voluntary donations to support Association activities.',
      },
      {
        type: 'p',
        text: 'Donation information may be collected through a Google Form. The information requested will depend on the donation process being used at the time.',
      },
      {
        type: 'p',
        text: 'If payment is made through a third-party payment service or bank, payment information may also be subject to the privacy policies and terms of that service or financial institution.',
      },
      {
        type: 'p',
        text: 'We do not request or intend to collect full payment card numbers, passwords, banking PINs, or other highly sensitive payment credentials through ordinary Google Forms.',
      },
      {
        type: 'p',
        text: 'Please do not enter such information into a Google Form unless the form specifically directs you to a secure payment service provided by an authorised payment provider.',
      },
    ],
  },
  {
    heading: '5. Sharing of Information',
    blocks: [
      { type: 'p', text: 'We do not sell, rent, or trade your personal information.' },
      {
        type: 'p',
        text: 'Personal information may be accessed by authorised members or representatives of IIOGA who require it for legitimate Association activities.',
      },
      {
        type: 'p',
        text: 'We may also share information with service providers where reasonably necessary to operate our activities, such as services used for online forms, communications, event administration, or payments.',
      },
      {
        type: 'p',
        text: 'We may disclose information where required by applicable law, regulation, legal process, or a legitimate request from an authorised government or regulatory authority.',
      },
    ],
  },
  {
    heading: '6. Data Retention',
    blocks: [
      {
        type: 'p',
        text: 'We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including maintaining appropriate Association records and meeting legal or administrative requirements.',
      },
      {
        type: 'p',
        text: 'The retention period may vary depending on the type of information and the purpose for which it was collected.',
      },
      {
        type: 'p',
        text: 'When information is no longer reasonably required, we will take reasonable steps to delete or securely dispose of it, subject to any applicable record-keeping requirements.',
      },
    ],
  },
  {
    heading: '7. Data Security',
    blocks: [
      {
        type: 'p',
        text: 'We take reasonable administrative and technical measures to protect personal information against unauthorised access, alteration, disclosure, loss, or misuse.',
      },
      {
        type: 'p',
        text: 'However, no method of transmitting or storing information electronically can be guaranteed to be completely secure. You should therefore take reasonable care when submitting personal information online.',
      },
    ],
  },
  {
    heading: '8. Third-Party Services',
    blocks: [
      {
        type: 'p',
        text: 'Our website and Association activities may make use of third-party services, including Google Forms and potentially other services for communications, payments, event management, or website hosting.',
      },
      {
        type: 'p',
        text: 'These third-party services may process information in accordance with their own terms and privacy policies.',
      },
      {
        type: 'p',
        text: 'We recommend reviewing the relevant third-party privacy policies before submitting information through their services.',
      },
    ],
  },
  {
    heading: "9. Children's Privacy",
    blocks: [
      {
        type: 'p',
        text: 'Our website is not specifically directed at children, and we do not knowingly seek to collect personal information from children through our website.',
      },
      {
        type: 'p',
        text: 'Where participation in an Association activity involves a minor, information should be provided by a parent, guardian, or other person authorised to do so, where appropriate.',
      },
    ],
  },
  {
    heading: '10. Your Privacy Rights',
    blocks: [
      {
        type: 'p',
        text: 'Depending on applicable law, you may have rights relating to the personal information we hold about you, including the right to:',
      },
      {
        type: 'ul',
        items: [
          'Request information about personal data we hold about you',
          'Request correction of inaccurate or incomplete information',
          'Request deletion of information where there is no legitimate reason for us to retain it',
          'Withdraw consent where processing is based on consent, subject to applicable limitations',
          'Raise a concern about how your information is being handled',
        ],
      },
      {
        type: 'p',
        text: 'To make a privacy-related request, please contact us using the contact details provided below.',
      },
      {
        type: 'p',
        text: 'We may need to verify your identity before processing certain requests.',
      },
    ],
  },
  {
    heading: '11. Changes to This Privacy Policy',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy from time to time to reflect changes in our activities, services, technology, or applicable legal requirements.',
      },
      {
        type: 'p',
        text: 'Any updated version will be published on this page with a revised Effective Date.',
      },
    ],
  },
  {
    heading: '12. Contact Us',
    blocks: [
      {
        type: 'p',
        text: 'If you have questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please contact:',
      },
      { type: 'contact' },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated="18 September 2026"
      sections={sections}
    />
  )
}
