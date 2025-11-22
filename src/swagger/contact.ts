/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact information management APIs
 */

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get contact information (Public)
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Contact information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact information not configured yet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Contact information not configured yet
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Create contact information (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hours:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Mon-Fri 9AM-5PM", "Sat 10AM-2PM"]
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: contact@cleaningservices.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               whatsapp:
 *                 type: string
 *                 example: "+1234567890"
 *               facebook:
 *                 type: string
 *                 example: "https://facebook.com/cleaningservices"
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/cleaningservices"
 *               twitter:
 *                 type: string
 *                 example: "https://twitter.com/cleaningservices"
 *     responses:
 *       201:
 *         description: Contact information created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Contact information already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Contact information already exists. Use PATCH to update.
 */

/**
 * @swagger
 * /api/contact:
 *   patch:
 *     summary: Update contact information (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hours:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Mon-Fri 9AM-6PM"]
 *               address:
 *                 type: string
 *                 example: "456 New Street, City, Country"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: info@cleaningservices.com
 *               phone:
 *                 type: string
 *                 example: "+9876543210"
 *               whatsapp:
 *                 type: string
 *                 example: "+9876543210"
 *               facebook:
 *                 type: string
 *                 example: "https://facebook.com/newpage"
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/newpage"
 *               twitter:
 *                 type: string
 *                 example: "https://twitter.com/newpage"
 *     responses:
 *       200:
 *         description: Contact information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Contact information not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Contact information not found. Use POST to create.
 */
