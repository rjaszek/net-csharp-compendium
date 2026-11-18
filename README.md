# Kompendium .NET / C# przed rozmową rekrutacyjną

Dwujęzyczny (polski i angielski) zbiór notatek do przygotowania się do rozmowy rekrutacyjnej na stanowisko .NET / C# developera. To nie jest kurs „od zera”, tylko zwięzłe omówienia tematów, o które pytają na rozmowach, razem z przykładami kodu, typowymi pułapkami i pytaniami rekrutacyjnymi na końcu każdego tematu.

**Strona (PL):** https://net-csharp-kompendium.rhoster.pl/
**Site (EN):** https://net-csharp-kompendium.rhoster.pl/en/

Przełącznik języka PL/EN jest w nagłówku każdej strony i prowadzi do tego samego tematu w drugim języku. Wszystkie 77 tematów jest dostępnych w obu językach.

## Co jest w środku

Ponad 70 tematów w 14 działach:

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
