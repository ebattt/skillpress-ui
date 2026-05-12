# Changelog

Questo file registra solo cambiamenti utili al contract o al runtime.

## Corrente

- Visual change: `OrdersTable` compatta meglio la dashboard mobile/tablet
  nascondendo `Pagamento` e `Totale` dalla riga principale fino a `1023px`;
  i valori restano nella riga dettagli mobile.
- Hardening: `OrdersTable` evita min-width rigide del titolo e overflow della
  riga dettagli sotto `640px`.
- `ConfirmDialog` pubblicato nel contract pubblico con CSS, JS, hook `data-*`,
  eventi e voce in `dist/public-api.json`.
- `--z-modal` elevato sopra `--z-mobile-bar` per evitare che barre mobile fixed
  intercettino i click dei dialog.
- Public API consolidata per classi CSS, attributi `data-*`, eventi `sp:*` e
  moduli JS esposti da `window.SkillpressUI`.
- Gate di publish: naming, legacy leakage, data attrs, init contract, colori,
  CSS variables, breakpoint, build dist, pack check e contract check.

## Regola

Usare:

- `Contract change` per modifiche a classi, markup minimo, hook `data-*`,
  eventi o moduli JS pubblici.
- `Visual change` per modifiche solo estetiche.
- `Hardening` per fix interni senza cambio di contract.
