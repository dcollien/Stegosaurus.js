var Steganography = {
	insertMessage: function(canvas, message) {
		var ctx, imageData, mask, i, len, r, g, b, bits, ord, messageLength, bitStringLength, bitIndex;

		mask = 0xFE;
		ctx = canvas.getContext('2d');
		imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		bits = [];
		for (i = 0, messageLength = message.length; i !== messageLength; ++i) {
			ord = message[i].charCodeAt(0);

			for (bitIndex = 0; bitIndex < 8; ++bitIndex) {
				bits.push((ord & (1 << bitIndex)) ? 1 : 0);
			}
		}

		bitStringLength = bits.length;
		bitIndex = 0;
		for (i = 0, len = imageData.data.length; i < len; i += 4) {
			r = imageData.data[i];
			g = imageData.data[i+1];
			b = imageData.data[i+2];

			imageData.data[i+0] = (r & mask) + bits[bitIndex % bitStringLength];
			++bitIndex;

			imageData.data[i+1] = (g & mask) + bits[bitIndex % bitStringLength];
			++bitIndex;

			imageData.data[i+2] = (b & mask) + bits[bitIndex % bitStringLength];
			++bitIndex;
		}

		ctx.putImageData(imageData, 0, 0);
	},

	decodeMessage: function(canvas, offset) {
		if (!offset) {
			offset = 0;
		}

		var ctx, imageData, i, message, len, r, g, b, bits, mask, ord, bitIndex;

		ctx = canvas.getContext('2d');
		imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		message = '';

		bits = [];
		for (i = offset, len = imageData.data.length; i < len; i += 4) {
			r = imageData.data[i];
			g = imageData.data[i+1];
			b = imageData.data[i+2];

			bits.push(r & 1);
			bits.push(g & 1);
			bits.push(b & 1);
		}

		for (i = 0, len = bits.length; i < len; i += 8) {
			ord = 0;

			for (bitIndex = 7; bitIndex !== 0; --bitIndex) {
				ord += bits[i + bitIndex]; 
				ord = ord << 1;
			}
			ord += bits[i];

			message += String.fromCharCode(ord);
		}

		return message;
	}
};
