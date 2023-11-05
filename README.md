# Movie API

Bu proje, bir film veritabanını yönetmek için kullanılan bir Nest.js uygulamasını içerir. Bu README, projeyi yerel
geliştirme ortamında nasıl ayarlayacağınızı ve çalıştıracağınızı açıklar.

## Gereksinimler

Aşağıdaki yazılım ve araçları projeyi başlatmak için gereklidir:

- Node.js ve npm: [Node.js web sitesi](https://nodejs.org/)
- Docker: [Docker web sitesi](https://www.docker.com/)
- Git: [Git web sitesi](https://git-scm.com/)
- Postman: [Postman web sitesi](https://www.postman.com/)
- VS Code: [VS Code web sitesi](https://code.visualstudio.com/)
- MongoDB: [MongoDB web sitesi](https://www.mongodb.com/)
- Robo 3T: [Robo 3T web sitesi](https://robomongo.org/)

## Proje Kurulumu

1. Bu depoyu yerel makinenize klonlayın:

```bash
git clone https://github.com/baranbaturr01/case-for-eteration
```

2. Proje dizinine gidin:

```bash
cd case-for-eteration
```

3. Gerekli paketleri yükleyin:

```bash
npm install
```

4. Docker'da MongoDB'yi başlatın:

```bash
docker-compose up
```

5. Uygulamayı başlatın:

```bash
npm run start
```

6. Tarayıcınızda aşağıdaki URL'yi açın:

```bash
http://localhost:3005
```

## API Kullanımı

## Swagger Belgesi

Projemizin API belgesine Swagger aracılığıyla ulaşabilirsiniz. Aşağıdaki bağlantıyı kullanarak API'yi test
edebilirsiniz:

[Swagger API Belgesi](http://localhost:3005/api)

## Testleri Çalıştırma

```bash
npx jest 
```

## Dosya Yapısı

Proje dosya yapısı aşağıdaki gibi düzenlenmiştir:

- `src/`: Uygulama kaynak kodlarının bulunduğu dizin.
    - `entity/`: Veritabanı şemaları ve model sınıfları burada bulunur.
    - `movies/`: Filmle ilgili iş mantığı ve HTTP istekleri bu dizinde bulunur.
    - `schemas/`: MongoDB şema tanımlamaları bu dizinde bulunur.
    - `tmdb/`: The Movie Database (TMDb) API'larına erişim işlemleri burada yapılır.
- `test/`: Test dosyalarının bulunduğu dizin.
- `node_modules/`: Projede kullanılan paketlerin bulunduğu dizin.
- `docker-compose.yml`: MongoDB'nin Docker ile başlatılmasını sağlayan dosya.
- `package.json`: Proje bağımlılıklarını ve komutlarını içeren dosya.
- `README.md`: Proje hakkında bilgi veren dosya.
- `tsconfig.json`: TypeScript yapılandırma dosyası.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running the app

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If
you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
