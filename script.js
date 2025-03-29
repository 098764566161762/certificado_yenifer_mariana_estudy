// static/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para el modo de vista previa (si se usa en versión web)
    if (document.getElementById('previewBtn')) {
        document.getElementById('previewBtn').addEventListener('click', function() {
            generatePDF(true);
        });
    }

    // Funcionalidad para el botón de descarga (si se usa en versión web)
    if (document.getElementById('downloadBtn')) {
        document.getElementById('downloadBtn').addEventListener('click', function() {
            generatePDF(false);
        });
    }

    // Generar número de certificado automático (ejemplo)
    if (document.getElementById('certificateId')) {
        const now = new Date();
        const certId = `CERT-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random() * 10000)}`;
        document.getElementById('certificateId').textContent = certId;
    }

    // Función para generar PDF (usando html2pdf.js en versión web)
    function generatePDF(isPreview) {
        const element = document.getElementById('certificate-container');
        const opt = {
            margin: 10,
            filename: 'certificado_estudiantil.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        if (isPreview) {
            // Vista previa en nueva pestaña
            html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                window.open(pdf.output('bloburl'), '_blank');
            });
        } else {
            // Descarga directa
            html2pdf().set(opt).from(element).save();
        }
    }

    // Validación de formulario (si se usa en versión web)
    if (document.getElementById('certificateForm')) {
        document.getElementById('certificateForm').addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Por favor complete todos los campos requeridos');
            }
        });
    }

    // Mostrar fecha actual en formato legible
    if (document.getElementById('currentDate')) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('es-ES', options);
    }
});