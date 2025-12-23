import { ScrollReveal } from "../../../components/scroll-reveal";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl font-bold font-display mb-8">Dasar Kuki</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Kemaskini terakhir:</strong> {new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Pengenalan</h2>
            <p className="text-muted-foreground mb-4">
              Dasar Kuki ini menerangkan bagaimana Newy Enterprise ("kami," "kita," atau "kita") menggunakan kuki dan teknologi yang serupa apabila anda melawat laman web kami, menggunakan perkhidmatan kami, atau berinteraksi dengan kami dalam talian, selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia.
            </p>
            <p className="text-muted-foreground">
              Dengan menggunakan laman web kami, anda bersetuju dengan penggunaan kuki seperti yang diterangkan dalam dasar ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Apakah Kuki?</h2>
            <p className="text-muted-foreground mb-4">
              Kuki adalah fail teks kecil yang diletakkan pada peranti anda apabila anda melawat laman web. Kuki membantu laman web mengingati maklumat tentang lawatan anda, seperti pilihan bahasa dan tetapan lain, menjadikan lawatan seterusnya lebih mudah dan laman web lebih berguna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Jenis Kuki Yang Kami Gunakan</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Kuki Penting</h3>
            <p className="text-muted-foreground mb-4">
              Kuki ini diperlukan untuk laman web berfungsi dengan betul dan tidak boleh dimatikan dalam sistem kami.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.2 Kuki Prestasi</h3>
            <p className="text-muted-foreground mb-4">
              Kuki ini membolehkan kami mengira bilangan lawatan dan sumber trafik untuk meningkatkan prestasi laman web kami.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.3 Kuki Fungsian</h3>
            <p className="text-muted-foreground mb-4">
              Kuki ini membolehkan laman web menyediakan fungsi yang dipertingkatkan dan peribadi, seperti mengingati pilihan bahasa anda.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.4 Kuki Pemasaran</h3>
            <p className="text-muted-foreground mb-4">
              Kuki ini digunakan untuk menjejaki pelawat di seluruh laman web untuk tujuan pemasaran dan iklan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Menguruskan Kuki</h2>
            <p className="text-muted-foreground mb-4">
              Anda boleh mengawal dan/atau memadam kuki mengikut kehendak anda. Anda boleh memadam semua kuki yang sudah ada di komputer anda dan anda boleh menetapkan kebanyakan pelayar untuk menghalang kuki daripada diletakkan.
            </p>
            <p className="text-muted-foreground">
              Walau bagaimanapun, jika anda melakukan ini, anda mungkin perlu menyesuaikan beberapa pilihan secara manual setiap kali anda melawat laman web, dan beberapa perkhidmatan dan fungsi mungkin tidak berfungsi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Hubungi Kami</h2>
            <p className="text-muted-foreground mb-4">
              Jika anda mempunyai sebarang soalan mengenai Dasar Kuki kami, sila hubungi kami:
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

