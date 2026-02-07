import React from 'react'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

const ButtonDownload = ({ data }) => {
  const handleDownload = () => {
    const doc = new jsPDF()
    const title = 'Horaire des cours - 1ère Commerciale'

    // Titre principal
    doc.setFontSize(16)
    doc.text(title, 14, 15)

    const jours = data[0]
    let yPos = 25

    for (const [jour, cours] of Object.entries(jours)) {
      // Titre du jour
      doc.setFontSize(14)
      doc.text(jour, 14, yPos)
      yPos += 6

      // Préparer les données du tableau
      const tableData = cours.map(item => [
        item.heure,
        item.matiere,
        item.prof,
        item.salle,
      ])

      autoTable(doc, {
        startY: yPos,
        head: [['Heure', 'Matière', 'Prof', 'Salle']],
        body: tableData,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [200, 200, 200] }, // gris clair
        margin: { left: 14, right: 14 },
      })

      yPos = doc.lastAutoTable.finalY + 10

      // Saut de page automatique si nécessaire
      if (yPos > 260) {
        doc.addPage()
        yPos = 15
      }
    }

    doc.save('horaire.pdf')
  }
  return (
    <button
      onClick={handleDownload}
      className="btn-primary w-[99%] mt-3 flex items-center justify-center m-auto"
    >
      <span>Version PDF</span>
    </button>
  )
}

export default ButtonDownload
