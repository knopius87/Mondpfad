# Das Mondtal — Spanisch für Madrid

Eine Lern-App für Erwachsene, die innerhalb eines Jahres genug Spanisch lernen wollen, um in Madrid selbstständig zurechtzukommen: Alltag, Behörden, Wohnung, Arzt, Arbeit, Nachbarschaft.

Die App läuft vollständig offline, in einer einzigen HTML-Datei. Kein Konto, kein Server, keine Tracker, keine Werbung. Der Lernstand bleibt im Browser des Geräts.

---

## Was drin ist

| | |
|---|---|
| Lexeme | 1.396 in 21 Themen, mit Niveau A1/A2/B1, aktiv/rezeptiv, Lernwoche |
| Chunks | 120 feste Wendungen |
| Scaffolds | 144 produktive Satzmuster |
| Grammatik | 27 Themen, den Lernphasen zugeordnet |
| Missionen | 26 Situationen mit Dialog, Wortschatz, Grammatik und Übungen |
| Sprechkarten | 26, für zu Hause mit einem Gegenüber |
| Hintergründe | 48 Bilder, je Region vier Tageszeiten |

Der Wortschatz ist auf europäisches Spanisch ausgerichtet; 52 Einträge sind eigens als Spanien-typisch markiert (*coger, vale, venga, caña, ración, casero, abono, estanco* …).

## Aufbau

**Reise** — zwölf Regionen entlang eines Laternenpfads, jede mit zwei bis drei Missionen. Eine Mission läuft in vier Schritten: Wörter, Dialog, Grammatik, Übungen. Nach der Hälfte der Übungen kommt eine Pause; alles ist auf zehn bis fünfzehn Minuten am Tag ausgelegt.

**Üben** — Tagesziel mit Fortschrittsbalken, die fällige Wiederholung nach dem Leitner-Prinzip (Intervalle von einem bis 64 Tagen) und neue Einheiten nach der Lernwoche der Datenbank. Der Nachschub drosselt sich selbst: ab 18 fälligen Karten kommen nur noch fünf neue Einheiten pro Tag, ab 30 nur drei, ab 45 keine. Erst der Stau, dann der Nachschub.

**Sprechen** — alle Sprechkarten an einem Ort. Der übrige Teil der App kommt ohne Ton aus und ist in der Bahn benutzbar.

**Suchen** — das gesamte Material zum Nachschlagen: Wortschatz nach Thema, Grammatik, Chunks und Scaffolds. Mit Sonderzeichenleiste für Handytastaturen ohne spanisches Layout.

**Ich** — Stand, Erfolge, Begleiter, Kartenraum mit allen Hintergründen, Einstellungen, Sicherung.

### Zeitsteuerung

Die zwölf Regionen hängen an einem Kalender bis zum Umzug im August 2027. Eine Region öffnet sich erst, wenn die vorige abgeschlossen ist **und** 60 Prozent ihrer Karten sicher sitzen. Ein Wochenende Durchspielen funktioniert deshalb nicht — Karten erreichen die höheren Leitner-Boxen nur über echte Tagesabstände.

Der Zeitplan rechnet aber in **gelernten Tagen**, nicht in Kalendertagen: fünf gelernte Tage sind eine Lernwoche. Wer eine Woche krank ist oder verreist, verliert keinen Stoff, sondern schiebt die Zieldaten nach hinten. Dafür gibt es **91 Tage Puffer** über das Jahr. Wie viel davon verbraucht ist, steht auf der Startseite und im Profil.

Unter *Ich → Einstellungen* gibt es einen Testmodus, der alle Regionen öffnet. Der ist zum Anschauen gedacht, nicht zum Lernen.

## Lernstand sichern

Der Fortschritt liegt im `localStorage` **dieses einen Browsers**. Ein geleerter Browserspeicher, ein neues Gerät oder ein privates Fenster — und ein Lernjahr ist weg.

*Ich → Daten* bietet dafür:

- **Lernstand als Datei speichern** — lädt `mondtal-JJJJ-MM-TT.json` herunter
- **Datei laden** — spielt eine solche Datei wieder ein, auch auf einem anderen Gerät
- **Sicherungstext** — dieselben Daten zum Kopieren, falls der Browser Downloads blockiert

Nach 30 Tagen ohne Sicherung erinnert die Startseite daran.

## Auf dem Handy einrichten

**iPhone/iPad:** Seite in Safari öffnen → Teilen → *Zum Home-Bildschirm*. Chrome auf iOS kann das nicht.

**Android:** Seite in Chrome öffnen → Menü → *App installieren* bzw. *Zum Startbildschirm hinzufügen*.

Danach startet die App im Vollbild mit eigenem Icon und läuft ohne Netz, weil der Serviceworker sie im Gerätespeicher ablegt.

**Ohne Server:** `index.html` herunterladen und doppelklicken. Alles funktioniert, nur Icon und Offline-Speicherung entfallen — die brauchen eine echte Adresse mit `https`.

## Veröffentlichen über GitHub Pages

1. Neues Repository anlegen. Bei einem **privaten** Repository gehört GitHub Pages zu den kostenpflichtigen Tarifen; für den privaten Kreis ist ein öffentliches Repository ohne persönliche Daten der einfachere Weg.
2. Diese Dateien in den Hauptzweig legen — alle auf oberster Ebene, nicht in einen Unterordner:

```
index.html
manifest.webmanifest
sw.js
icon-192.png
icon-512.png
apple-touch-icon.png
favicon-64.png
README.md
```

3. *Settings → Pages → Source: Deploy from a branch*, Zweig `main`, Ordner `/ (root)`. Nach ein bis zwei Minuten liegt die App unter `https://<name>.github.io/<repo>/`.
4. Die Adresse an die Personen weitergeben, die sie nutzen sollen.

### Beim Aktualisieren

Wenn eine neue Fassung hochgeladen wird, muss in `sw.js` die Zeile

```js
const VERSION = "mondtal-v28";
```

hochgezählt werden. Sonst zeigen bereits installierte Geräte weiter die alte Fassung aus ihrem Speicher.

Der Lernstand überlebt ein Update — er hängt an der Adresse, nicht an der Datei.

## Technisches

- Eine HTML-Datei, rund 870 KB, davon etwa 640 KB Bilder als Base64
- Kein Framework, keine externen Schriften, keine Netzwerkaufrufe zur Laufzeit
- Speicherung ausschließlich über `localStorage`
- Getestet auf Chrome und Firefox, Handy und Rechner
- Barrierefreiheit: Tastaturbedienung, sichtbarer Fokus, `aria-live` für Rückmeldungen, Bedienelemente ab 44 px, Rücksicht auf `prefers-reduced-motion`

## Grenzen

Ehrlichkeitshalber:

- **Freies Sprechen und Schreiben kann die App nicht bewerten.** Dafür gibt es die Sprechkarten mit einem menschlichen Gegenüber.
- **Hörverstehen fehlt weitgehend.** Die Vorlesefunktion nutzt die Systemstimme des Geräts; ist keine spanische installiert, entfällt sie. Echte Aufnahmen in natürlichem Tempo wären der nächste sinnvolle Ausbau.
- **Die Übersetzungen stammen aus einer generierten Datenbank** und sind nicht Eintrag für Eintrag geprüft. Wer sicher gehen will, lässt die Bereiche Behörden, Gesundheit und Wohnen einmal von einem Muttersprachler überfliegen.
- **Die Dialoge sind erfunden**, nicht aus echten Aufnahmen gewonnen. Sie orientieren sich an typischen Abläufen in Madrid.

## Rechtliches

Private Nutzung. Die Hintergrundbilder und das Icon wurden für dieses Projekt selbst erzeugt; alle Zeichnungen in der App sind Vektorgrafiken im Quelltext. Es sind keine fremden Werke, Schriften oder Bibliotheken enthalten.
