interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: 'privacy' | 'cookies' | 'terms';
  language: string;
}

export default function LegalModal({ isOpen, onClose, content, language }: LegalModalProps) {
  if (!isOpen) return null;

  const getContent = () => {
    if (language === 'ro') {
      switch (content) {
        case 'privacy':
          return {
            title: 'Politică de Confidențialitate',
            content: `
              <h3 class="text-xl font-light mb-4">1. Introducere</h3>
              <p class="mb-4">Black Studio respectă confidențialitatea datelor dumneavoastră personale și se angajează să le protejeze în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).</p>
              
              <h3 class="text-xl font-light mb-4">2. Date colectate</h3>
              <p class="mb-4">Colectăm următoarele date personale:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Nume (opțional)</li>
                <li>Vârstă</li>
                <li>Număr de telefon</li>
                <li>Adresă de email</li>
                <li>Mesajul dumneavoastră</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">3. Scopul prelucrării</h3>
              <p class="mb-4">Datele sunt prelucrate exclusiv pentru:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Contactarea dumneavoastră în legătură cu solicitarea trimisă</li>
                <li>Furnizarea de informații despre serviciile noastre</li>
                <li>Comunicarea cu potențialii colaboratori</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">4. Baza legală</h3>
              <p class="mb-4">Prelucrăm datele pe baza consimțământului dumneavoastră explicit, exprimat prin bifarea căsuței din formular.</p>
              
              <h3 class="text-xl font-light mb-4">5. Păstrarea datelor</h3>
              <p class="mb-4">Datele sunt păstrate doar pe perioada necesară îndeplinirii scopului pentru care au fost colectate sau conform obligațiilor legale.</p>
              
              <h3 class="text-xl font-light mb-4">6. Drepturile dumneavoastră</h3>
              <p class="mb-4">Aveți dreptul de:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Acces la datele personale</li>
                <li>Rectificare a datelor incorecte</li>
                <li>Ștergere a datelor (dreptul de a fi uitat)</li>
                <li>Restricționare a prelucrării</li>
                <li>Portabilitate a datelor</li>
                <li>Opoziție la prelucrare</li>
                <li>Retragere a consimțământului</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">7. Contact</h3>
              <p class="mb-4">Pentru exercitarea drepturilor sau întrebări legate de protecția datelor, ne puteți contacta la: andreibojici@gmail.com</p>
            `
          };
        case 'cookies':
          return {
            title: 'Politică Cookies',
            content: `
              <h3 class="text-xl font-light mb-4">1. Ce sunt cookie-urile?</h3>
              <p class="mb-4">Cookie-urile sunt fișiere text mici stocate pe dispozitivul dumneavoastră când vizitați un site web.</p>
              
              <h3 class="text-xl font-light mb-4">2. Cookie-uri utilizate</h3>
              <p class="mb-4">Acest site utilizează EXCLUSIV cookie-uri strict necesare pentru funcționarea tehnică a site-ului:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Cookie-uri de sesiune pentru navigare</li>
                <li>Cookie-uri pentru preferințe de limbă</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">3. Ce NU utilizăm</h3>
              <p class="mb-4">Site-ul nostru NU utilizează:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Cookie-uri de analiză sau tracking</li>
                <li>Cookie-uri de marketing</li>
                <li>Cookie-uri de la terțe părți</li>
                <li>Pixeli de urmărire</li>
                <li>Scripturi de analiză (Google Analytics, etc.)</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">4. Gestionarea cookie-urilor</h3>
              <p class="mb-4">Puteți gestiona sau șterge cookie-urile din setările browser-ului dumneavoastră. Dezactivarea cookie-urilor strict necesare poate afecta funcționarea site-ului.</p>
            `
          };
        case 'terms':
          return {
            title: 'Termeni și Condiții',
            content: `
              <h3 class="text-xl font-light mb-4">1. Acceptarea termenilor</h3>
              <p class="mb-4">Prin utilizarea acestui site și a serviciilor Black Studio, acceptați acești termeni și condiții.</p>
              
              <h3 class="text-xl font-light mb-4">2. Servicii oferite</h3>
              <p class="mb-4">Black Studio oferă:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Training pentru modele începătoare în industria videochat/OnlyFans</li>
                <li>Management și ghidare profesională</li>
                <li>Suport și mentorat continuu</li>
                <li>Strategie de conținut și marketing</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">3. Eligibilitate</h3>
              <p class="mb-4">Serviciile noastre sunt disponibile exclusiv pentru persoane care:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Au împlinit vârsta de 18 ani</li>
                <li>Sunt cetățeni români sau au drept de muncă în România</li>
                <li>Acceptă natura activității și condițiile de colaborare</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">4. Confidențialitate</h3>
              <p class="mb-4">Ne angajăm să păstrăm confidențialitatea identității și datelor personale ale colaboratorilor noștri.</p>
              
              <h3 class="text-xl font-light mb-4">5. Responsabilități</h3>
              <p class="mb-4">Black Studio oferă:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Training profesional și suport constant</li>
                <li>Ghidare în dezvoltarea carierei</li>
                <li>Mediu de lucru sigur și respectuos</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">6. Limitări</h3>
              <p class="mb-4">Nu garantăm:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Venituri specifice sau garantate</li>
                <li>Rezultate imediate</li>
                <li>Succesul depinde de implicare, dedicare și strategie</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">7. Proprietate intelectuală</h3>
              <p class="mb-4">Tot conținutul acestui site (text, imagini, logo) este proprietatea Black Studio și este protejat de legile drepturilor de autor.</p>
              
              <h3 class="text-xl font-light mb-4">8. Modificări</h3>
              <p class="mb-4">Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi publicate pe această pagină.</p>
              
              <h3 class="text-xl font-light mb-4">9. Contact</h3>
              <p class="mb-4">Pentru întrebări despre acești termeni, contactați-ne la: andreibojici@gmail.com sau 0775 134 887</p>
            `
          };
      }
    } else {
      switch (content) {
        case 'privacy':
          return {
            title: 'Privacy Policy',
            content: `
              <h3 class="text-xl font-light mb-4">1. Introduction</h3>
              <p class="mb-4">Black Studio respects the confidentiality of your personal data and is committed to protecting it in accordance with the General Data Protection Regulation (GDPR).</p>
              
              <h3 class="text-xl font-light mb-4">2. Data Collected</h3>
              <p class="mb-4">We collect the following personal data:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Name (optional)</li>
                <li>Age</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Your message</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">3. Purpose of Processing</h3>
              <p class="mb-4">Data is processed exclusively for:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Contacting you regarding your submitted request</li>
                <li>Providing information about our services</li>
                <li>Communication with potential collaborators</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">4. Legal Basis</h3>
              <p class="mb-4">We process data based on your explicit consent, expressed by checking the box in the form.</p>
              
              <h3 class="text-xl font-light mb-4">5. Data Retention</h3>
              <p class="mb-4">Data is retained only for the period necessary to fulfill the purpose for which it was collected or according to legal obligations.</p>
              
              <h3 class="text-xl font-light mb-4">6. Your Rights</h3>
              <p class="mb-4">You have the right to:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Access personal data</li>
                <li>Rectify incorrect data</li>
                <li>Erase data (right to be forgotten)</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">7. Contact</h3>
              <p class="mb-4">To exercise your rights or for questions related to data protection, you can contact us at: andreibojici@gmail.com</p>
            `
          };
        case 'cookies':
          return {
            title: 'Cookie Policy',
            content: `
              <h3 class="text-xl font-light mb-4">1. What are cookies?</h3>
              <p class="mb-4">Cookies are small text files stored on your device when you visit a website.</p>
              
              <h3 class="text-xl font-light mb-4">2. Cookies Used</h3>
              <p class="mb-4">This site uses ONLY strictly necessary cookies for the technical operation of the site:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Session cookies for navigation</li>
                <li>Cookies for language preferences</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">3. What We DON'T Use</h3>
              <p class="mb-4">Our site does NOT use:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Analytics or tracking cookies</li>
                <li>Marketing cookies</li>
                <li>Third-party cookies</li>
                <li>Tracking pixels</li>
                <li>Analytics scripts (Google Analytics, etc.)</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">4. Managing Cookies</h3>
              <p class="mb-4">You can manage or delete cookies from your browser settings. Disabling strictly necessary cookies may affect site functionality.</p>
            `
          };
        case 'terms':
          return {
            title: 'Terms and Conditions',
            content: `
              <h3 class="text-xl font-light mb-4">1. Acceptance of Terms</h3>
              <p class="mb-4">By using this site and Black Studio services, you accept these terms and conditions.</p>
              
              <h3 class="text-xl font-light mb-4">2. Services Offered</h3>
              <p class="mb-4">Black Studio offers:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Training for beginner models in the webcam/OnlyFans industry</li>
                <li>Professional management and guidance</li>
                <li>Continuous support and mentoring</li>
                <li>Content and marketing strategy</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">3. Eligibility</h3>
              <p class="mb-4">Our services are available exclusively to persons who:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Are 18 years of age or older</li>
                <li>Are Romanian citizens or have the right to work in Romania</li>
                <li>Accept the nature of the activity and collaboration conditions</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">4. Confidentiality</h3>
              <p class="mb-4">We are committed to maintaining the confidentiality of the identity and personal data of our collaborators.</p>
              
              <h3 class="text-xl font-light mb-4">5. Responsibilities</h3>
              <p class="mb-4">Black Studio provides:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Professional training and constant support</li>
                <li>Career development guidance</li>
                <li>Safe and respectful work environment</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">6. Limitations</h3>
              <p class="mb-4">We do not guarantee:</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Specific or guaranteed income</li>
                <li>Immediate results</li>
                <li>Success depends on involvement, dedication and strategy</li>
              </ul>
              
              <h3 class="text-xl font-light mb-4">7. Intellectual Property</h3>
              <p class="mb-4">All content on this site (text, images, logo) is the property of Black Studio and is protected by copyright laws.</p>
              
              <h3 class="text-xl font-light mb-4">8. Modifications</h3>
              <p class="mb-4">We reserve the right to modify these terms at any time. Changes will be posted on this page.</p>
              
              <h3 class="text-xl font-light mb-4">9. Contact</h3>
              <p class="mb-4">For questions about these terms, contact us at: andreibojici@gmail.com or 0775 134 887</p>
            `
          };
      }
    }
  };

  const { title, content: htmlContent } = getContent();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-zinc-900 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-zinc-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-light">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        
        <div 
          className="px-6 py-6 overflow-y-auto max-h-[calc(80vh-80px)] text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}