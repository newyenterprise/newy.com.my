import { ScrollReveal } from "../../../components/scroll-reveal";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl font-bold font-display mb-8">Dasar Privasi</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Kemaskini terakhir:</strong> {new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Pengenalan</h2>
            <p className="text-muted-foreground mb-4">
              Newy Enterprise ("kami," "kita," atau "kita") komited untuk melindungi privasi anda selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia. Dasar Privasi ini menerangkan bagaimana kami mengumpul, menggunakan, mendedahkan, dan melindungi maklumat anda apabila anda melawat laman web kami, menggunakan perkhidmatan kami, atau berinteraksi dengan kami dalam apa jua cara.
            </p>
            <p className="text-muted-foreground">
              Dengan menggunakan perkhidmatan kami, anda bersetuju dengan amalan data yang diterangkan dalam dasar ini. Jika anda tidak bersetuju dengan dasar dan amalan kami, sila jangan gunakan perkhidmatan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Maklumat Yang Kami Kumpul</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Maklumat Peribadi</h3>
            <p className="text-muted-foreground mb-4">
              Kami mungkin mengumpul maklumat peribadi yang anda berikan secara sukarela kepada kami, termasuk tetapi tidak terhad kepada:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Nama, alamat e-mel, nombor telefon, dan alamat surat-menyurat</li>
              <li>Nama syarikat, jawatan, dan maklumat perniagaan</li>
              <li>Maklumat pembayaran dan pengebilan</li>
              <li>Pilihan komunikasi dan pilihan pemasaran</li>
              <li>Maklumat yang diberikan melalui borang hubungan, perundingan, atau permintaan sokongan</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Maklumat Yang Dikumpul Secara Automatik</h3>
            <p className="text-muted-foreground mb-4">
              Apabila anda melawat laman web kami, kami secara automatik mengumpul maklumat tertentu, termasuk:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Alamat IP, jenis pelayar, dan sistem operasi</li>
              <li>Halaman yang dilawati, masa yang dihabiskan di halaman, dan corak navigasi</li>
              <li>Maklumat peranti dan pengecam peranti unik</li>
              <li>Kuki dan teknologi penjejakan yang serupa</li>
              <li>Sumber rujukan dan istilah carian</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Bagaimana Kami Menggunakan Maklumat Anda</h2>
            <p className="text-muted-foreground mb-4">
              Kami menggunakan maklumat yang kami kumpul untuk pelbagai tujuan selaras dengan PDPA Malaysia, termasuk:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Menyediakan dan mengekalkan perkhidmatan digital kami (pembangunan laman web, aplikasi mudah alih, automasi AI, pemasaran digital)</li>
              <li>Memproses transaksi dan menguruskan pembayaran</li>
              <li>Berkomunikasi dengan anda tentang perkhidmatan kami dan menjawab pertanyaan</li>
              <li>Menghantar bahan pemasaran dan promosi (hanya dengan persetujuan eksplisit anda)</li>
              <li>Menyediakan sokongan teknikal dan perkhidmatan pelanggan</li>
              <li>Meningkatkan laman web dan perkhidmatan kami berdasarkan maklum balas pengguna</li>
              <li>Menganalisis corak penggunaan dan trend untuk penambahbaikan perkhidmatan</li>
              <li>Mencegah penipuan dan memastikan keselamatan sistem kami</li>
              <li>Mematuhi kewajipan undang-undang di bawah undang-undang Malaysia</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Keselamatan Data</h2>
            <p className="text-muted-foreground mb-4">
              Kami melaksanakan langkah keselamatan teknikal dan organisasi yang sesuai selaras dengan PDPA Malaysia untuk melindungi maklumat peribadi anda daripada akses tanpa kebenaran, pengubahan, pendedahan, atau kemusnahan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Hak dan Pilihan Anda</h2>
            <p className="text-muted-foreground mb-4">
              Di bawah Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia, anda mempunyai hak berikut mengenai maklumat peribadi anda:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Hak Akses:</strong> Meminta akses kepada maklumat peribadi anda yang kami pegang</li>
              <li><strong>Hak Pembetulan:</strong> Meminta pembetulan maklumat peribadi yang tidak tepat, tidak lengkap, atau ketinggalan zaman</li>
              <li><strong>Hak Menarik Balik Persetujuan:</strong> Menarik balik persetujuan anda untuk pemprosesan maklumat peribadi anda pada bila-bila masa</li>
              <li><strong>Hak Mencegah Pemprosesan:</strong> Meminta kami berhenti memproses maklumat peribadi anda untuk tujuan pemasaran langsung</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Hubungi Kami</h2>
            <p className="text-muted-foreground mb-4">
              Jika anda mempunyai sebarang soalan mengenai Dasar Privasi ini atau amalan data kami, sila hubungi kami:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">
                <strong>Newy Enterprise</strong><br />
                E-mel: hello@newy.com.my<br />
                Telefon: +60 11 2890 8472<br />
                Alamat: Bandar Baru Bangi, Selangor, Malaysia<br />
                Laman Web: www.newy.com.my
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}


