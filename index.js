function abrirMenu() {
  document.getElementById("menuLateral").style.width = "250px";
}

function fecharMenu() {
  document.getElementById("menuLateral").style.width = "0";
}

var selectedAtividades = [];
let alertShown = false;

function evitaConflito() {
  var grupos = document.querySelectorAll('.group-checkbox');

  grupos.forEach(function (grupo) {
    var grupoId = grupo.getAttribute('data-group');
    var checkboxes = grupo.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('click', function () {
        if (this.checked) {
          var currentStart = parseInt(this.getAttribute('start'));
          var currentEnd = parseInt(this.getAttribute('end'));

          var canAddAtividade = true;
          var checkboxesMesmoGrupo = grupo.querySelectorAll('input[type="checkbox"]:checked');
          checkboxesMesmoGrupo.forEach(function (selectedCheckbox) {
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
            atualizarTabela(checkbox);
          } else {
              this.checked = false;
              var atividade = checkbox.getAttribute("atividade");
              console.log("Checkbox " + checkbox.id + " não foi adicionada à lista de nomes.");
              alert("Conflito de horário. A atividade: " + atividade + " não pôde ser adicionada.");

          }
        } else {
          var index = selectedAtividades.indexOf(checkbox.getAttribute('atividade'));
          if (index !== -1) {
            selectedAtividades.splice(index, 1);
            atualizarTabela(checkbox);
            console.log("Checkbox " + checkbox.id + " removida da lista de nomes.");
          }
        }
      });
    });
  });

  
  function atualizarTabela(checkbox) {
    var i = checkbox.getAttribute("linha");
    console.log(checkbox)
    atualizarCelula("L" + i + "S" + i, document.getElementById("segunda" + i));
    atualizarCelula("L" + i + "T" + i, document.getElementById("terça" + i));
    atualizarCelula("L" + i + "Q" + i, document.getElementById("quarta" + i));
    atualizarCelula("L" + i + "QT" + i, document.getElementById("quinta" + i));
    atualizarCelula("L" + i + "SEX" + i, document.getElementById("sexta" + i));
  }

  // Função auxiliar para atualizar uma célula da tabela
  function atualizarCelula(celulaID, checkbox) {
    var celula = document.getElementById(celulaID);
    if (checkbox?.checked) {
      celula.textContent = checkbox.getAttribute("atividade");
    } else {
      celula.textContent = "";
    }
  }

}

function updateLimit() {
  let cbs = document.querySelectorAll('input[type="checkbox"]');
  let limite = 0;

  cbs.forEach(checkbox => {
    if (checkbox.checked) {
      limite += parseInt(checkbox.getAttribute('cont'));
    }
  });

  if (limite > 3 && !alertShown) {
    alertShown = true;
    alert('Limite de atividades pagas excedido! Limite: ' + limite);
  }
}

// Adiciona um EventListener a cada checkbox
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateLimit);
  });
});

document.addEventListener('DOMContentLoaded', evitaConflito);
function gerar() {
  var doc = new jsPDF({ orientation: 'vertical', unit: 'mm', lineHeight: 1.0 });

  html2canvas(document.getElementById("tabela")).then(function (canvas) {
    var imgData = canvas.toDataURL('image/png');

    doc.addImage(imgData, 'PNG', 10, 10, 190, 0);


    doc.save('tabela.pdf');
  });
}


