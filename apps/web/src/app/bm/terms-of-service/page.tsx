import { ScrollReveal } from "../../../components/scroll-reveal";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl font-bold font-display mb-8">Terma Perkhidmatan</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Kemaskini terakhir:</strong> {new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Penerimaan Terma</h2>
            <p className="text-muted-foreground mb-4">
              Dengan mengakses dan menggunakan perkhidmatan yang disediakan oleh Newy Enterprise ("kami," "kita," atau "kita"), termasuk laman web kami, aplikasi, dan sebarang perkhidmatan berkaitan (secara kolektif, "Perkhidmatan"), anda menerima dan bersetuju untuk terikat dengan Terma Perkhidmatan ini ("Terma") yang diatur oleh undang-undang Malaysia.
            </p>
            <p className="text-muted-foreground">
              Jika anda tidak bersetuju dengan mana-mana bahagian terma ini, anda tidak boleh mengakses atau menggunakan Perkhidmatan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Perkhidmatan Kami</h2>
            <p className="text-muted-foreground mb-4">
              Newy Enterprise menyediakan perkhidmatan digital berikut:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Pembangunan laman web dan aplikasi</li>
              <li>Automasi AI dan penyelesaian teknologi</li>
              <li>Pemasaran digital dan strategi dalam talian</li>
              <li>Perundingan dan sokongan teknikal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Penggunaan Perkhidmatan</h2>
            <p className="text-muted-foreground mb-4">
              Anda bersetuju untuk menggunakan Perkhidmatan kami hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar mana-mana undang-undang atau peraturan yang berkuat kuasa di Malaysia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Bayaran dan Invois</h2>
            <p className="text-muted-foreground mb-4">
              Semua harga adalah dalam Ringgit Malaysia (MYR) kecuali dinyatakan sebaliknya. Bayaran mesti dibuat mengikut terma yang dipersetujui dalam kontrak perkhidmatan anda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Harta Intelek</h2>
            <p className="text-muted-foreground mb-4">
              Semua kandungan, reka bentuk, dan bahan di laman web dan perkhidmatan kami adalah milik Newy Enterprise dan dilindungi oleh undang-undang hak cipta Malaysia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Hubungi Kami</h2>
            <p className="text-muted-foreground mb-4">
              Jika anda mempunyai sebarang soalan mengenai Terma Perkhidmatan ini, sila hubungi kami:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">
                <strong>Newy Enterprise</strong><br />
                E-mel: hello@newy.com.my<br />
                Telefon: +60 11 2890 8472<br />
                Alamat: Bandar Baru Bangi, Selangor, Malaysia
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}

