const { html } = wp.blocks.query;

wp.blocks.registerBlock( 'wp/generic', {
	isVisible: false,

	attributes: {
		html: html()
	},

	edit( { attributes } ) {
		// TODO: Not `dangerouslySetInnerHTML`
		return (
			<div
				dangerouslySetInnerHTML={ { __html: attributes.html } }
				className="generic-block" />
		);
	},

	save( { attributes } ) {
		return attributes.html;
	}
} );
