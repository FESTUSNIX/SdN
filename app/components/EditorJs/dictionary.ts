import { I18nConfig } from '@editorjs/editorjs'

export const dictionary: I18nConfig = {
	/**
	 * @type {EditorJsI18nDictionary}
	 */

	messages: {
		ui: {
			blockTunes: {
				toggler: {
					'Click to tune': 'Modyfikuj',
					'or drag to move': 'lub przeciągnij aby zmienić pozycje'
				}
			},
			inlineToolbar: {
				converter: {
					'Convert to': 'Zamień na'
				}
			},
			toolbar: {
				toolbox: {
					Add: 'Dodaj'
				}
			},
			popover: {
				Filter: 'Filtruj',
				'Nothing found': 'Nic nie odnaleziono'
			}
		},
		toolNames: {
			Text: 'Tekst',
			Heading: 'Nagłówek',
			List: 'Lista',
			Quote: 'Cytat',
			Code: 'Kod',
			Table: 'Tabela',
			Link: 'Link',
			Bold: 'Pogrubienie',
			Italic: 'Kursywa'
		},
		tools: {
			link: {
				'Add a link': 'Dodaj link'
			},
			stub: {
				'The block can not be displayed correctly.': 'Ten blok nie może zostać poprawnie wyświetlony'
			},
			linkTool: {
				Link: 'Link',
				"Couldn't fetch the link data": 'Nie udało się pobrać danych z linku',
				"Couldn't get this link data, try the other one": 'Nie udało się pobrać danych tego linku. Spróbuj użyć innego',
				'Wrong response format from the server': 'Niepoprawna odpowiedź z serwera'
			},
			header: {
				Header: 'Nagłówek',
				'Heading 1': 'Nagłówek 1',
				'Heading 2': 'Nagłówek 2',
				'Heading 3': 'Nagłówek 3',
				'Heading 4': 'Nagłówek 4'
			},
			paragraph: {
				'Enter something': 'Wpisz coś'
			},
			list: {
				Ordered: 'Uporządkowana',
				Unordered: 'Nieuporządkowana'
			}
		},
		blockTunes: {
			delete: {
				Delete: 'Usuń'
			},
			moveUp: {
				'Move up': 'Przesuń wyżej'
			},
			moveDown: {
				'Move down': 'Przesuń niżej'
			}
		}
	}
}
