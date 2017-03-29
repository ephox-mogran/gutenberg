/**
 * External dependencies
 */
import * as query from 'hpq';

/**
 * Takes a block list and returns the serialized post content
 *
 * @param  {Array}  blocks Block list
 * @return {String}        The post content
 */
export default function serialize( blocks ) {
	return blocks.reduce( ( memo, block ) => {
		const blockType = block.blockType;
		const blockSettings = wp.blocks.getBlockSettings( blockType );
		const rawContent = wp.element.renderToString(
			blockSettings.save( block.attributes )
		);
		let contentAttributes = {};
		if ( 'function' === typeof blockSettings.attributes ) {
			contentAttributes = blockSettings.attributes( rawContent );
		} else if ( blockSettings.attributes ) {
			contentAttributes = query.parse( rawContent, blockSettings.attributes );
		}
		const commentAttributes = Object.keys( block.attributes ).reduce( ( attrs, attribute ) => {
			if ( contentAttributes[ attribute ] ) {
				return attrs;
			}
			attrs.push( { key: attribute, value: block.attributes[ attribute ] } );
			return attrs;
		}, [] );
		const serializedCommentAttributes = ! commentAttributes.length
			? ''
			: ' ' + commentAttributes.map( ( { key, value } ) => `${key}=${value}` ).join( ' ' );

		return memo + `<!-- wp:${ blockType } ${ serializedCommentAttributes }-->${ rawContent }<!-- /wp:${ blockType } -->`;
	}, '' );
}
