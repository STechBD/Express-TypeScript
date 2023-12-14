console.log('Welcome to Install-Express by S Technologies')

$(document).ready(function () {
	$('#projectButton').click(function () {
		$(this).toggleClass('text-sky-500')
		$('#projectButton svg').toggleClass('text-sky-500')
		$('#project').toggle()
	})

	$('#menuButton, #menuCloseButton').click(function () {
		$('#menu').toggle()
	})

	$('#mobileProjectButton').click(function () {
		$(this).toggleClass('text-sky-500')
		$('#mobileProject').toggle()
	})

	$('#copy').click(function () {
		const text = `npx create-express.js@latest
`
		navigator.clipboard.writeText(text).then(() => {
			$('#copyText').text('Copied!')
			setTimeout(() => {
				$('#copyText').text('Copy')
			}, 1000)
		}).catch(e => console.log(e))
	})
})
