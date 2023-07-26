var selectedAtividades = [];

function evitaConflito() {
  var grupos = document.querySelectorAll('.group-checkbox');

  grupos.forEach(function(grupo) {
    var grupoId = grupo.getAttribute('data-group');
    var checkboxes = grupo.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          var currentStart = parseInt(this.getAttribute('start'));
          var currentEnd = parseInt(this.getAttribute('end'));

          var canAddAtividade = true;
          var checkboxesMesmoGrupo = grupo.querySelectorAll('input[type="checkbox"]:checked');
          checkboxesMesmoGrupo.forEach(function(selectedCheckbox) {
            if (selectedCheckbox !== checkbox) {
              var selectedStart = parseInt(selectedCheckbox.getAttribute('start'));
              var selectedEnd = parseInt(selectedCheckbox.getAttribute('end'));

              if (currentStart >= selectedEnd || currentEnd <= selectedStart) {
                console.log("Checkbox " + checkbox.id + " tem o mesmo valor de start e end que a checkbox " + selectedCheckbox.id);
              } else {
                canAddAtividade = false;
              }
            }
          });

          if (canAddAtividade) {
            selectedAtividades.push(checkbox.getAttribute('atividade'));
            console.log("Checkbox " + checkbox.id + " adicionada à lista de nomes.");
          } else {
            this.checked = false;
            console.log("Checkbox " + checkbox.id + " não foi adicionada à lista de nomes.");
          }
        } else {
          var index = selectedAtividades.indexOf(checkbox.getAttribute('atividade'));
          if (index !== -1) {
            selectedAtividades.splice(index, 1);
            console.log("Checkbox " + checkbox.id + " removida da lista de nomes.");
          }
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', evitaConflito);

function gerar() {
  var doc = new jsPDF({orientation: 'portrait', unit: 'mm', lineHeight: 1.0});
  
  var atividadesFinal = [];

  for (var i = 0; i < selectedAtividades.length; i++) {
    var atividade = selectedAtividades[i];
    atividadesFinal += atividade + "\n";
  }

  doc.setFontSize(12);
  doc.setLineWidth(180);
  doc.text(atividadesFinal, 10, 20);

  doc.save('gnh.pdf'); //comando para salvar o documento PDF
}