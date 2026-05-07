import { ContactCard } from "@/components/ContactCard";
import { Badge } from "@/components/ui/badge";
import { getContacts } from "@/lib/data";

export default async function ContactsPage() {
  const contacts = await getContacts();
  const grouped = contacts.reduce<Record<string, typeof contacts>>((acc, contact) => {
    acc[contact.company.name] = acc[contact.company.name] ?? [];
    acc[contact.company.name].push(contact);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-accent">Identify</p>
          <h1 className="mt-1 text-3xl font-semibold">Contacts</h1>
          <p className="mt-2 text-muted-foreground">Relationship tracker grouped by target company.</p>
        </div>
        <Badge variant="outline">{contacts.length} contacts</Badge>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([company, companyContacts]) => (
          <section key={company} className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{company}</h2>
              <Badge variant="muted">{companyContacts.length}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {companyContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
