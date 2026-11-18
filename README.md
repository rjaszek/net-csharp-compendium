# .NET / C# Interview Compendium

**English** | [Polski](#kompendium-net--c-przed-rozmową-rekrutacyjną)

A bilingual (English and Polish) set of notes for preparing for a .NET / C# developer job interview. It is not a course "from scratch", but concise write-ups of the topics interviewers ask about, with code examples, typical pitfalls and interview questions at the end of each topic.

**Site (EN):** https://net-csharp-kompendium.rhoster.pl/en/
**Strona (PL):** https://net-csharp-kompendium.rhoster.pl/

The PL/EN switch is in the header of every page and leads to the same topic in the other language. All 77 topics are available in both languages.

## What is inside

77 topics in 14 sections:

| Section | Example subjects |
|---|---|
| C# — language fundamentals | types, async/await, LINQ, `IEquatable`, collections |
| SOLID, Clean Code, DI | SOLID, dependency injection, Clean Architecture, DDD |
| Web API, Blazor | ASP.NET Core, middleware, REST, Blazor |
| Entity Framework Core | queries, change tracking, migrations, performance |
| CQRS, MediatR | commands and queries, who calls the handlers |
| Distributed architecture | Kafka vs RabbitMQ, asynchronous communication, data consistency |
| Security | cryptography, JWT / OAuth2 / OIDC, certificates and TLS, multi-tenancy, refresh tokens |
| Memory and threads | memory management, concurrency, `ConcurrentQueue` |
| Algorithms, data structures | complexity, collections, classic problems |
| Testing, WPF, AutoMapper | unit tests, MVVM, object mapping |
| Process and methodologies | SDLC and software development methodologies |

Every topic has searchable tags. The search box on the home page searches titles, tags and content. Topics link to each other ("See also").

## How this repository is built

This is a **generated static site** (no framework and no server-side build step):

```
index.html             <- home page (PL): section menu, search
topics/<id>.html       <- one file per topic (PL)
en/index.html          <- home page (EN)
en/topics/<id>.html    <- one file per topic (EN)
styles.css             <- styles (shared by both languages)
app.js                 <- search and navigation (shared, picks the language from the URL)
```

`index.html`, `topics/*.html` and `en/**` are **generated** from the source files `data.js` (Polish) and `data.en.js` (English, built from the translations in `i18n/`) kept in a separate source folder outside this repository, so manual edits to these files will be overwritten on the next generation. Content is changed in the source and only the finished result lands here. `styles.css` and `app.js` are edited directly in this repository; after changing them, bump the asset version number so browsers fetch fresh files.

The same content is also available as a single-file interactive version (a Claude Artifact), maintained in parallel with this site.

## Runnable examples

Some topics come with working .NET 8 projects (including Kafka and RabbitMQ, cryptography, Web API security, multi-tenancy, a refresh token with a database variant). They live in the source folder, not in this repository, and are described in the content of the relevant topics. Not all of them were compiled in the environment where they were written, so treat them as a starting point.

## Publishing

The site is hosted on Rhoster servers. Deployment is done by pushing changes to the `main` branch.

## Notes

The content was created in conversations with Claude and is meant for learning. Before basing production decisions on it (especially in the security topics), verify it against the official documentation.

---

# Kompendium .NET / C# przed rozmową rekrutacyjną

[English](#net--c-interview-compendium) | **Polski**

Dwujęzyczny (polski i angielski) zbiór notatek do przygotowania się do rozmowy rekrutacyjnej na stanowisko .NET / C# developera. To nie jest kurs „od zera”, tylko zwięzłe omówienia tematów, o które pytają na rozmowach, razem z przykładami kodu, typowymi pułapkami i pytaniami rekrutacyjnymi na końcu każdego tematu.

**Strona (PL):** https://net-csharp-kompendium.rhoster.pl/
**Site (EN):** https://net-csharp-kompendium.rhoster.pl/en/

Przełącznik języka PL/EN jest w nagłówku każdej strony i prowadzi do tego samego tematu w drugim języku. Wszystkie 77 tematów jest dostępnych w obu językach.

## Co jest w środku

77 tematów w 14 działach:

| Dział | Przykładowe zagadnienia |
|---|---|
| C# — fundamenty języka | typy, async/await, LINQ, `IEquatable`, kolekcje |
| SOLID, Clean Code, DI | SOLID, wstrzykiwanie zależności, Clean Architecture, DDD |
| Web API, Blazor | ASP.NET Core, middleware, REST, Blazor |
| Entity Framework Core | zapytania, śledzenie zmian, migracje, wydajność |
| CQRS, MediatR | komendy i zapytania, kto woła handlery |
| Architektura rozproszona | Kafka vs RabbitMQ, komunikacja asynchroniczna, spójność danych |
| Bezpieczeństwo | kryptografia, JWT / OAuth2 / OIDC, certyfikaty i TLS, multi-tenancy, refresh token |
| Pamięć i wątki | zarządzanie pamięcią, współbieżność, `ConcurrentQueue` |
| Algorytmy, struktury danych | złożoność, kolekcje, klasyczne zadania |
| Testy, WPF, AutoMapper | testy jednostkowe, MVVM, mapowanie obiektów |
| Proces i metodyki | SDLC i metodyki wytwarzania oprogramowania |

Każdy temat ma wyszukiwalne tagi. Wyszukiwarka na stronie głównej przeszukuje tytuły, tagi i treść. Tematy łączą się ze sobą linkami („Zobacz też”).

## Jak jest zbudowane to repozytorium

To jest **wygenerowana strona statyczna** (bez frameworka i bez kroku budowania po stronie serwera):

```
index.html             <- strona główna (PL): menu działów, wyszukiwarka
topics/<id>.html       <- jeden plik na temat (PL)
en/index.html          <- strona główna (EN)
en/topics/<id>.html    <- jeden plik na temat (EN)
styles.css             <- style (wspólne dla obu języków)
app.js                 <- wyszukiwarka i nawigacja (wspólne, wybiera język po adresie)
```

Pliki `index.html`, `topics/*.html` oraz `en/**` są **generowane** ze źródłowych plików `data.js` (polski) i `data.en.js` (angielski, powstaje z tłumaczeń w `i18n/`) w osobnym folderze źródłowym, poza tym repozytorium, więc ręczne poprawki w tych plikach zostaną nadpisane przy następnym generowaniu. Treść zmienia się w źródle, a tutaj trafia gotowy wynik. Pliki `styles.css` i `app.js` edytuje się bezpośrednio w tym repozytorium; po ich zmianie trzeba zwiększyć numer wersji zasobów, żeby przeglądarki pobrały świeże pliki.

Ta sama treść jest też dostępna jako jednoplikowa wersja interaktywna (Claude Artifact), utrzymywana równolegle z tą stroną.

## Przykłady uruchamialne

Część tematów ma działające projekty .NET 8 (m.in. Kafka i RabbitMQ, kryptografia, zabezpieczanie Web API, multi-tenancy, refresh token z wariantem w bazie danych). Leżą w folderze źródłowym, nie w tym repozytorium, i są opisane w treści odpowiednich tematów. Nie wszystkie były kompilowane w środowisku, w którym powstały, więc traktuj je jako punkt wyjścia.

## Publikacja

Strona jest hostowana na serwerach Rhoster. Wdrożenie polega na wypchnięciu zmian na gałąź `main`.

## Uwagi

Treść powstała w rozmowach z Claude i jest przeznaczona do nauki. Zanim oprzesz o nią decyzje produkcyjne (zwłaszcza w tematach bezpieczeństwa), zweryfikuj ją z oficjalną dokumentacją.
