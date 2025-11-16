/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Public APIs for viewing previous work
 */

/**
 * @swagger
 * /api/previous-work:
 *   get:
 *     summary: Get all previous work entries
 *     tags: [Public]
 *     parameters:
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by category
 *         example: Home Cleaning
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of previous work entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PreviousWork'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 50
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/previous-work/featured:
 *   get:
 *     summary: Get featured previous work entries
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: List of featured previous work entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PreviousWork'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/previous-work/{id}:
 *   get:
 *     summary: Get a single previous work entry by ID
 *     tags: [Public]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Previous work ID (UUID)
 *         example: d1f6b387-45e0-4c51-9f18-c89d3289fef1
 *     responses:
 *       200:
 *         description: Previous work entry details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PreviousWork'
 *       404:
 *         description: Previous work not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-01-16T12:34:56.789Z
 */
