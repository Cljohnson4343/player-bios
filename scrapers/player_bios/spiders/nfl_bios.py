import scrapy


class Nflbios(scrapy.Spider):
    name = "nfl_bios"

    def start_requests(self):
        urls = [
          'https://www.foxsports.com/nfl/players'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
      for player_link in response.css('tr>td>div>a::attr(href)').getall():
        if player_link is not None:
          player_link = response.urljoin(player_link)
          yield scrapy.Request(player_link, callback=self.parse_player_page)

      next_page = None
      links = response.css('div.wisbb_paginator>a')
      page_numbers = links.css('::text').getall()
      for i in range(len(page_numbers)):
        value = page_numbers[i]
        if 'Next' in value:
          next_page = links.css('::attr(href)').getall()[i]

      if next_page is not None:
        next_page = response.urljoin(next_page)
        print("\n\nNext Page\n\n")
        print(next_page)
        print("\n\n")
        yield scrapy.Request(next_page, callback=self.parse)

    def parse_player_page(self, res):
      born = ''
      hometown = ''

      player_data = res.css('table.wisbb_playerData>tbody>tr>td::text').getall()
      for i in range(len(player_data)):
        value = player_data[i].strip()
        if (value == 'Date of Birth'):
          born = player_data[i+1].strip()
        elif (value == 'From'):
          hometown = player_data[i+1].strip()


      yield {
        'first_name': res.css('span.wisbb_firstName::text').get(),
        'last_name': res.css('span.wisbb_lastName::text').get(),
        'born': born,
        'hometown': hometown,
        'league': 'nfl',
        'url': res.url
      }